<template>
    <div class="ao-city-selector">
        <div class="province-selector" v-if="items.province">
            <AoSelector 
                :options="provinceOptions" 
                v-model="selectValue.province"
                placeholder="请选择省份"
                @update:modelValue="handleProvinceChange" 
            />
        </div>
        <div class="city-selector" v-if="items.city">
            <AoSelector 
                :options="cityOptions" 
                v-model="selectValue.city"
                placeholder="请选择城市"
                @update:modelValue="handleCityChange" 
            />
        </div>
        <div class="county-selector" v-if="items.county">
            <AoSelector 
                :options="countyOptions" 
                v-model="selectValue.county"
                placeholder="请选择区县"
                @update:modelValue="handleCountyChange" 
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import pcaData from '@/assets/pca/pca-code.json'
import AoSelector from '@/components/common/AoSelector.vue'

const props = defineProps({
    items: {
        type: Object,
        default: () => {
            return {
                province: true,
                city: true,
                county: true
            }
        }
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

const provinceOptions = ref([])
const cityOptions = ref([])
const countyOptions = ref([])

// 初始化省份数据
const initProvinceOptions = () => {
    provinceOptions.value = pcaData.map(province => ({
        name: province.name,
        code: province.code
    }))
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

// 省份改变事件
const handleProvinceChange = (provinceCode) => {
    selectValue.value.province = provinceCode
    selectValue.value.city = ''
    selectValue.value.county = ''
    
    // 更新城市选项
    if (provinceCode) {
        cityOptions.value = getCityOptions(provinceCode)
    } else {
        cityOptions.value = []
    }
    
    // 清空区县选项
    countyOptions.value = []
    
    emitValue()
}

// 城市改变事件
const handleCityChange = (cityCode) => {
    selectValue.value.city = cityCode
    selectValue.value.county = ''
    
    // 更新区县选项
    if (cityCode) {
        countyOptions.value = getCountyOptions(cityCode)
    } else {
        countyOptions.value = []
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
    emit('update:modelValue', { ...selectValue.value })
}

// 监听外部传入的值变化
watch(() => props.modelValue, (newValue) => {
    if (newValue) {
        selectValue.value = { ...newValue }
        
        // 如果有省份值，初始化城市选项
        if (newValue.province) {
            cityOptions.value = getCityOptions(newValue.province)
        }
        
        // 如果有城市值，初始化区县选项
        if (newValue.city) {
            countyOptions.value = getCountyOptions(newValue.city)
        }
    }
}, { immediate: true, deep: true })

// 获取完整的地址信息
const getFullAddress = () => {
    const result = {
        provinceName: '',
        cityName: '',
        countyName: '',
        provinceCode: selectValue.value.province,
        cityCode: selectValue.value.city,
        countyCode: selectValue.value.county
    }
    
    // 获取省份名称
    if (selectValue.value.province) {
        const province = provinceOptions.value.find(p => p.code === selectValue.value.province)
        result.provinceName = province ? province.name : ''
    }
    
    // 获取城市名称
    if (selectValue.value.city) {
        const city = cityOptions.value.find(c => c.code === selectValue.value.city)
        result.cityName = city ? city.name : ''
    }
    
    // 获取区县名称
    if (selectValue.value.county) {
        const county = countyOptions.value.find(c => c.code === selectValue.value.county)
        result.countyName = county ? county.name : ''
    }
    
    return result
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
        emitValue()
    }
})

onMounted(() => {
    initProvinceOptions()
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