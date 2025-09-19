<template>
    <div class="search-input">
        <div class="ao-search-container">
            <AoSearch :suggestion="tips" :history="searchHistory" v-model="searchValue" @clear="searchValue = ''"
                @focus="handleFocus" @search="handleSearch">
                <template #left>
                    <div class="left-search-icon">
                        <span><i class="iconfont icon-sousuo"></i></span>
                    </div>
                </template>
                <template #clear="{ onClear }">
                    <div class="clear-icon" @click="onClear" @mousedown.prevent>
                        <span><i class="iconfont icon-close"></i></span>
                    </div>
                </template>
                <template #right>
                    <div class="search-button" @click="handleSearch" @mousedown.prevent>
                        <button>搜索</button>
                    </div>
                </template>
            </AoSearch>
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import AoSearch from '@/components/common/AoSearch.vue';
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    tips: {
        type: Array,
        default: []
    }
})

const emit = defineEmits(['update:modelValue', 'focus', 'search'])
const searchValue = ref(props.modelValue)


const searchHistory = ref([
    "vue3",
    "react hooks最佳实践",
    "如何学习TypeScript",
    "js",
    "2023前端发展趋势",
    "css动画效果",
    "node.js性能优化",
    "webpack配置",
    "es6新特性",
    "前端面试题",
    "python",
    "机器学习入门",
    "rust vs go",
    "docker部署前端项目",
    "git高级用法",
    "如何提高代码质量",
    "前端性能优化技巧",
    "小程序开发",
    "nuxt.js服务端渲染",
    "大前端技术栈",
    "算法",

])

const handleSearch = () => {
    emit('search')
}

watch(() => searchValue.value, (newValue) => {
    if (!newValue) return
    emit('update:modelValue', newValue)
    console.log(newValue);

})

const handleFocus = () => {
    emit('focus')
}

</script>
<style lang="scss" scoped>
@use '@/assets/styles/search/_search-input.scss' as *;
</style>