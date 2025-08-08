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
                            <li v-for="(item, index) in item.items" :key="index">{{ item }}</li>
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
const isShowMoreFilter = ref(false)
const filterItems = computed(() => {
    return isShowMoreFilter.value ? filterItemList.value : filterItemList.value.slice(0, 1);
})
const filterItemList = ref([
    {
        label: '结果排序',
        items: [
            "综合排序",
            "最多下载",
            "最多评论",
            "最多收藏",
            "最新发布",
            "最高评分"
        ],

    },
    {
        label: '存储占用',
        items: [
            "< 1MB",
            "1~10MB",
            "10~50MB",
            "50~200MB",
            "200~50MB",
            "500~1GB",
            "1~5GB",
            "5GB+"
        ]
    },
    {
        label: '付费制度',
        items: [
            "完全免费",
            "试用转付费",
            "买断制",
            "订阅制",
            "内购制",
            "开源",
        ]

    }


])

</script>
<style lang="scss" scoped>
@use '@/assets/styles/search/_search-filter.scss' as *;
</style>