<template>
    <div class="search-filter">
        <div class="filter-wrapper">
            <div class="filter-main">
                <div class="filter-group" v-for="(item, index) in filterItems" :key="index">
                    <div class="filter-label">
                        <span>{{ item.label }}</span>
                    </div>
                    <div class="filter-items">
                        <ul>
                            <li v-for="(option, index) in item.options" :key="index"
                                @click="handleOptionsSelect(item.label, option.value)"
                                :class="{ active: isOptionActive(item.label, option.value) }">{{ option.name }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="more-filter">
                <button @click="isShowMoreFilter = !isShowMoreFilter" :class="{ arrow: isShowMoreFilter }"><i
                        class="iconfont icon-down"></i></button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { searchFilterOptions } from '@/utils/filter-options';
const emit = defineEmits(['filter-change'])
const isShowMoreFilter = ref(false)
const filterItems = computed(() => {
    return isShowMoreFilter.value ? searchFilterOptions : searchFilterOptions.slice(0, 1);
})

const filterMapping = {
    "结果排序": 'sortType',
    "存储占用": 'size',
    "付费制度": 'pricingModel'
}

const initDefaultValues = () => {
    const filterValue = {
        sortType: 0,
        size: '',
        pricingModel: ''
    }

    return filterValue
}

const isOptionActive = (label, value) => {
    const field = filterMapping[label]
    return field ? selectData.value[field] === value : false
}

const handleOptionsSelect = (label, value) => {
    const field = filterMapping[label]
    const currentValue = selectData.value[field]

    // 如果点击的是当前选中的选项，则取消选择（重置为默认值）
    if (currentValue === value) {
        if (field === 'sortType') {
            selectData.value[field] = 0
        } else {
            selectData.value[field] = ''
        }
    } else {
        // 否则选择新的选项
        selectData.value[field] = value
    }

    emit('filter-change', selectData.value)
}

const selectData = ref(initDefaultValues())


</script>
<style lang="scss" scoped>
@use '@/assets/styles/search/_search-filter.scss' as *;
</style>