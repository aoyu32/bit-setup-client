<template>
    <div class="category">
        <div class="category-top">
            <div class="category-option-container">
                <CategoryOption :father="categoryStore.fatherList" :child="categoryStore.childList"
                    :options="filterOptions" @filterChange="handleFilterChange" />
            </div>
        </div>
        <div class="category-bottom">
            <div class="sort-wrapper">
                <div class="app-count">
                    <span>筛选结果 : </span>
                    <span>{{ categoryStore.appData.total }}</span>
                </div>
                <div class="app-sort">
                    <ul>
                        <!-- <li v-for="(item, index) in sortOption" :key="index">{{ item }}</li> -->
                        <li style="font-size: 14px;">
                            <!-- <AoSwitch /> -->
                            <span>第 {{ currentPageNum }} 页，</span>
                            <span>共 {{ categoryStore.appData.pages }} 页</span>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="app-page-container">
                <div class="app-page-wrapper" v-if="categoryStore.appData.total !== 0">
                    <AppPage :data="categoryStore.appData" @page-change="handlePageChange" :pageSize="pageSize" />
                </div>
                <div class="no-data" v-else>
                    <p>空空如也~~~~</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import CategoryOption from '@/components/category/CategoryOption.vue';
import AoSwitch from '@/components/common/AoSwitch.vue';
import AppPage from '@/components/home/AppPage.vue';
import { useCategoryStore } from '@/stores/category';
import { filterOptions } from '@/utils/filter-options.js'
const appCount = ref(0)
const sortOption = ref(['评分', '下载量', '上传日期', '名称', '随机'])
const categoryStore = useCategoryStore()
const fatherCategory = ref(0)
const filterPageData = ref(null)
const pageSize = ref(20)
const currentPageNum = ref(1)


onMounted(() => {
    categoryStore.fetchFaterList(1)
})

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滚动
    })
}

const handlePageChange = (pageNum) => {
    filterPageData.value.pageNum = pageNum
    filterPageData.value.pageSize = pageSize.value
    currentPageNum.value = pageNum
    categoryStore.fetchAppByFilter(filterPageData.value)
    scrollToTop()
}

const handleFilterChange = (filterData) => {

    fatherCategory.value = filterData.category
    filterPageData.value = filterData
    filterPageData.value.pageNum = 1
    filterPageData.value.pageSize = pageSize.value
    console.log(filterPageData.value);
    scrollToTop()

    categoryStore.fetchAppByFilter(filterData)
}

watch(() => fatherCategory.value, (newValue) => {
    if (newValue) {
        categoryStore.fetchChildList(newValue)
    }
})
</script>
<style lang="scss" scoped>
.category {
    @include wh;

    .category-top {
        @include wh(100p, n);
        margin: 20px 0 10px 0;

    }

    .category-bottom {


        .sort-wrapper {
            padding: 0 10px;
            @include wh(100p, 60);
            margin-bottom: 10px;
            @include flex(c, s-b);

            @include c-t {
                background-color: color(c-g);
                color: color(c-g9);
            }

            @include b-r($b-r);

            .app-sort {
                @include flex(c, c);

                ul {
                    @include flex(c, c);
                    gap: 10px;

                    li {
                        padding-left: 10px;
                    }
                }
            }

        }

        .no-data {
            @include wh(100p, 20vh);
            @include flex(c, c);
            @include b-r($b-r);
            font-weight: 550;

            @include c-t {
                background-color: color(c-g);
                color: color(c-g9, 0.5);

            }
        }
    }

}
</style>