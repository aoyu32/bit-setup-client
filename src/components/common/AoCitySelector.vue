<template>
    <div class="ao-city-selector">
        <div class="province-selector" v-if="items.province">
            <AoSelector :options="provinceOptions" v-model="selectValue.province" placeholder="请选择省份" valueKey="code"
                labelKey="name" @update:modelValue="handleProvinceChange" />
        </div>
        <div class="city-selector" v-if="items.city">
            <AoSelector :options="cityOptions" v-model="selectValue.city" placeholder="请选择城市" valueKey="code"
                labelKey="name" @update:modelValue="handleCityChange" />
        </div>
        <div class="county-selector" v-if="items.county">
            <AoSelector :options="countyOptions" v-model="selectValue.county" placeholder="请选择区县" valueKey="code"
                labelKey="name" @update:modelValue="handleCountyChange" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import pcaData from '@/assets/pca/pca-code.json'
import AoSelector from '@/components/common/AoSelector.vue'

const props = defineProps({
    items: {
        type: Object,
        default: () => ({
            province: true,
            city: true,
            county: true
        })
    },
    modelValue: {
        type: Object,
        default: () => ({
            province: '',
            city: '',
            county: ''
        })
    }
})

const emit = defineEmits(['update:modelValue'])

const selectValue = ref({
    province: '',
    city: '',
    county: ''
})

// 存储完整的选项信息
const currentProvinceOptions = ref([])
const currentCityOptions = ref([])
const currentCountyOptions = ref([])

const provinceOptions = ref([])
const cityOptions = ref([])
const countyOptions = ref([])

// 根据省份名称查找code
const findProvinceCodeByName = (provinceName) => {
    const province = pcaData.find(p => p.name === provinceName)
    return province ? province.code : ''
}

// 根据城市名称查找code（需要省份信息）
const findCityCodeByName = (cityName, provinceCode) => {
    if (!provinceCode) return ''
    const province = pcaData.find(p => p.code === provinceCode)
    if (province && province.children) {
        const city = province.children.find(c => c.name === cityName)
        return city ? city.code : ''
    }
    return ''
}

// 初始化省份数据
const initProvinceOptions = () => {
    provinceOptions.value = pcaData.map(province => ({
        name: province.name,
        code: province.code
    }))
    currentProvinceOptions.value = provinceOptions.value
}

// 根据省份代码获取城市数据
const getCityOptions = (provinceCode) => {
    const province = pcaData.find(p => p.code === provinceCode)
    if (province && province.children) {
        return province.children.map(city => ({
            name: city.name,
            code: city.code
        }))
    }
    return []
}

// 根据城市代码获取区县数据
const getCountyOptions = (cityCode) => {
    for (let province of pcaData) {
        if (province.children) {
            const city = province.children.find(c => c.code === cityCode)
            if (city && city.children) {
                return city.children.map(county => ({
                    name: county.name,
                    code: county.code
                }))
            }
        }
    }
    return []
}

// 根据code获取name
const getNameByCode = (code, options) => {
    const option = options.find(item => item.code === code)
    return option ? option.name : ''
}

// 初始化选中值 - 新增方法
const initSelectedValues = () => {
    if (props.modelValue) {
        const { province, city, county } = props.modelValue

        // 如果有省份名称，查找对应的code
        if (province) {
            const provinceCode = findProvinceCodeByName(province)
            selectValue.value.province = provinceCode

            // 初始化城市选项
            if (provinceCode) {
                const newCityOptions = getCityOptions(provinceCode)
                cityOptions.value = newCityOptions
                currentCityOptions.value = newCityOptions

                // 如果有城市名称，查找对应的code
                if (city) {
                    const cityCode = findCityCodeByName(city, provinceCode)
                    selectValue.value.city = cityCode

                    // 初始化区县选项
                    if (cityCode) {
                        const newCountyOptions = getCountyOptions(cityCode)
                        countyOptions.value = newCountyOptions
                        currentCountyOptions.value = newCountyOptions

                        // 区县逻辑类似，如果需要可以继续处理
                    }
                }
            }
        }
    }
}

// 省份改变事件
const handleProvinceChange = (provinceCode) => {
    selectValue.value.province = provinceCode
    selectValue.value.city = ''
    selectValue.value.county = ''

    if (provinceCode) {
        const newCityOptions = getCityOptions(provinceCode)
        cityOptions.value = newCityOptions
        currentCityOptions.value = newCityOptions
    } else {
        cityOptions.value = []
        currentCityOptions.value = []
    }

    countyOptions.value = []
    currentCountyOptions.value = []

    emitValue()
}

// 城市改变事件
const handleCityChange = (cityCode) => {
    selectValue.value.city = cityCode
    selectValue.value.county = ''

    if (cityCode) {
        const newCountyOptions = getCountyOptions(cityCode)
        countyOptions.value = newCountyOptions
        currentCountyOptions.value = newCountyOptions
    } else {
        countyOptions.value = []
        currentCountyOptions.value = []
    }

    emitValue()
}

// 区县改变事件
const handleCountyChange = (countyCode) => {
    selectValue.value.county = countyCode
    emitValue()
}

// 发送值变化事件
const emitValue = () => {
    const result = {
        province: getNameByCode(selectValue.value.province, currentProvinceOptions.value),
        city: getNameByCode(selectValue.value.city, currentCityOptions.value),
        county: getNameByCode(selectValue.value.county, currentCountyOptions.value),
        provinceCode: selectValue.value.province,
        cityCode: selectValue.value.city,
        countyCode: selectValue.value.county
    }
    emit('update:modelValue', result)
}

// 监听外部传入的值变化
watch(() => props.modelValue, (newValue) => {
    if (newValue) {
        initSelectedValues()
    }
}, { immediate: true, deep: true })

// 获取完整的地址信息
const getFullAddress = () => {
    return {
        provinceName: getNameByCode(selectValue.value.province, currentProvinceOptions.value),
        cityName: getNameByCode(selectValue.value.city, currentCityOptions.value),
        countyName: getNameByCode(selectValue.value.county, currentCountyOptions.value),
        provinceCode: selectValue.value.province,
        cityCode: selectValue.value.city,
        countyCode: selectValue.value.county
    }
}

// 暴露方法给父组件使用
defineExpose({
    getFullAddress,
    reset: () => {
        selectValue.value = {
            province: '',
            city: '',
            county: ''
        }
        cityOptions.value = []
        countyOptions.value = []
        currentCityOptions.value = []
        currentCountyOptions.value = []
        emitValue()
    }
})

onMounted(() => {
    initProvinceOptions()
    // 确保在挂载后也初始化选中值
    initSelectedValues()
})
</script>

<style lang="scss" scoped>
.ao-city-selector {
    display: flex;
    gap: 12px;


    .province-selector,
    .city-selector,
    .county-selector {
        flex: 1;
        min-width: 120px;
    }

    // 响应式布局
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 8px;

        .province-selector,
        .city-selector,
        .county-selector {
            width: 100%;
        }
    }
}
</style>