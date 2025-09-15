import { defineStore } from "pinia";
import { ref } from 'vue'
import { appApi } from "@/apis/apis";

export const useHomeStore = defineStore('home', () => {
    const hotList = ref([])
    const recommendList = ref([])
    const mustList = ref([])
    const appList = ref([])
    const currentPage = ref(1)
    const pageSize = ref(20)
    const hasMoreData = ref(true)
    

    //获取热门列表
    const fetchHotList = () => {
        appApi.getHotList().then(resp => {
            hotList.value = resp.data
        }).catch(error => {
            console.log(error);
        })
    }

    //获取推荐列表
    const fetchRecommendList = () => {
        appApi.getRecommendList().then(resp => {
            recommendList.value = resp.data
        }).catch(error => {
            console.log(error);
        })
    }

    //获取必备列表
    const fetchMustHaveList = () => {
        appApi.getMustHaveList().then(resp => {
            mustList.value = resp.data
        }).catch(error => {
            console.log(error);
        })
    }

    //分页获取应用列表
    const fetchAppList = (pageNum = 1, pageSize = 20, isLoadMore = false) => {
        return appApi.getPageList(pageNum, pageSize).then(resp => {
            const data = resp.data.list
            if (isLoadMore) {
                // 加载更多时追加数据
                appList.value = [...appList.value, ...data]
            } else {
                // 首次加载时替换数据
                appList.value = data
            }

            // 判断是否还有更多数据
            if (data.length < pageSize) {
                hasMoreData.value = false
            }

            console.log(data);
            return data
        }).catch(error => {
            console.log(error);
            throw error
        })
    }

    // 加载更多数据
    const loadMoreAppList = () => {
        if (!hasMoreData.value) return Promise.resolve([])

        currentPage.value++
        return fetchAppList(currentPage.value, pageSize.value, true)
    }

    // 重置分页状态
    const resetPagination = () => {
        currentPage.value = 1
        hasMoreData.value = true
        appList.value = []
    }

    return {
        hotList,
        recommendList,
        mustList,
        appList,
        currentPage,
        pageSize,
        hasMoreData,
        fetchHotList,
        fetchRecommendList,
        fetchMustHaveList,
        fetchAppList,
        loadMoreAppList,
        resetPagination
    }
})