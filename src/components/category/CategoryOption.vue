<template>
    <div class="category-option">
        <div class="category-wrapper">
            <div class="father-category">
                <div class="category-label">
                    <span>类别 :</span>
                </div>
                <div class="category-item">
                    <ul>
                        <li v-for="category in father" :key="category.id"
                            :class="{ active: selectData.category === category.id }"
                            @click="handleCategorySelect('category', category.id)">
                            {{ category.categoryName }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="child-category">
                <div class="category-label">
                    <span></span>
                </div>
                <div class="category-item">
                    <ul>
                        <li v-for="subCategory in child" :key="subCategory.id"
                            :class="{ active: selectData.subCategory === subCategory.id }"
                            @click="handleCategorySelect('subCategory', subCategory.id)">
                            {{ subCategory.categoryName }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 其他选项 -->
        <div class="option-wrapper" v-for="(item, index) in options" :key="index">
            <div class="option-label">
                <span>{{ item.label }} :</span>
            </div>
            <div class="option-item">
                <ul>
                    <li v-for="(option, optionIndex) in item.options" :key="optionIndex" :data-tooltip="option.tooltip"
                        :class="{ active: isOptionActive(item.label, option.value) }"
                        @click="handleOptionSelect(item.label, option.value)">
                        {{ typeof option === 'object' ? option.name : option }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
    father: {
        type: Array,
        default: []
    },
    child: {
        type: Array,
        default: () => []
    },
    options: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['filterChange'])

// 字段名映射
const fieldMapping = {
    '评分': 'rating',
    '下载量级': 'downloadLevel',
    '支持的平台': 'platform',
    '大小': 'size',
    '付费制度': 'paymentModel',
    '内存占用': 'memoryUsage',
    '安装方式': 'installMethod',
    '其他': 'other'
}

// 初始化默认值
const initializeDefaultValues = () => {
    const defaultData = {
        category: 0,
        subCategory: 0,
        rating: '',
        downloadLevel: '',
        platform: '',
        size: '',
        paymentModel: '',
        memoryUsage: '',
        installMethod: '',
        other: ''
    }

    // 设置分类默认值为第一个选项
    if (props.father && props.father.length > 0) {
        defaultData.category = props.father[0].id
    }

    // 设置其他选项默认值为第一个选项（通常是"不限"）
    if (props.options && props.options.length > 0) {
        props.options.forEach(item => {
            const field = fieldMapping[item.label]
            if (field && item.options && item.options.length > 0) {
                defaultData[field] = item.options[0].value
            }
        })
    }

    return defaultData
}

// 选择的数据状态
const selectData = ref(initializeDefaultValues())

// // 计算当前选中主分类的子分类
// const currentSubCategories = computed(() => {
//     if (!selectData.value.category) {
//         return []
//     }
//     return props.child.filter(item => item.parentId === selectData.value.category) || []
// })

// 监听主分类变化，自动设置子分类默认值
watch(() => selectData.value.category, (newCategoryId) => {
    const subCategories = props.child.filter(item => item.parentId === newCategoryId)
    if (subCategories && subCategories.length > 0) {
        selectData.value.subCategory = subCategories[0].id
    } else {
        selectData.value.subCategory = 0
    }
    emitFilterChange()
})

// 处理分类选择
const handleCategorySelect = (type, value) => {
    if (type === 'category') {
        selectData.value.category = selectData.value.category === value ? 0 : value
        // 切换主分类时清空子分类选择
        if (selectData.value.category !== value) {
            selectData.value.subCategory = 0
        }
    } else if (type === 'subCategory') {
        selectData.value.subCategory = selectData.value.subCategory === value ? 0 : value
    }

    emitFilterChange()
}

// 处理其他选项选择
const handleOptionSelect = (label, value) => {
    const field = fieldMapping[label]
    if (field) {
        // 如果点击的是当前选中的选项，则取消选择（设为空字符串）
        selectData.value[field] = selectData.value[field] === value ? '' : value
        emitFilterChange()
    }
}

// 判断选项是否激活
const isOptionActive = (label, value) => {
    const field = fieldMapping[label]
    return field ? selectData.value[field] === value : false
}

// 发送筛选变化事件
const emitFilterChange = () => {
    const filterData = {
        category: selectData.value.category,
        subCategory: selectData.value.subCategory,
        rating: selectData.value.rating,
        downloadLevel: selectData.value.downloadLevel,
        platform: selectData.value.platform,
        size: selectData.value.size,
        paymentModel: selectData.value.paymentModel,
        memoryUsage: selectData.value.memoryUsage,
        installMethod: selectData.value.installMethod,
        other: selectData.value.other
    }

    emit('filterChange', filterData)
}

// 重置筛选条件的方法（可供父组件调用）
const resetFilters = () => {
    const defaultData = initializeDefaultValues()
    Object.keys(defaultData).forEach(key => {
        selectData.value[key] = defaultData[key]
    })
    emitFilterChange()
}

// 设置筛选条件的方法（可供父组件调用）
const setFilters = (filters) => {
    Object.keys(filters).forEach(key => {
        if (key in selectData.value) {
            selectData.value[key] = filters[key]
        }
    })
    emitFilterChange()
}

// 暴露方法给父组件
defineExpose({
    resetFilters,
    setFilters,
    selectData: selectData.value
})

// 初始化时发送默认值
onMounted(() => {
    emitFilterChange()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/category/_category-option.scss' as *;
</style>