import { defineStore } from "pinia";
import { ref } from 'vue'
import { searchApi } from "../apis/apis";
import { useUserInfoStore } from '@/stores/user'
import message from "../utils/message";
import { useAuthStore } from "./auth";

export const useSearchStore = defineStore('search', () => {

    const userStore = useUserInfoStore()
    const authStore = useAuthStore()

    const searchTips = ref([])
    const searchApps = ref([])
    const searchHistory = ref([])

    const fetchSearchTips = async (param) => {
        try {
            const resp = await searchApi.getSearchTips(param);
            searchTips.value = resp.data
            console.log(searchTips.value);
        } catch (error) {
            message.error("获取搜索提示失败");
        }
    }

    const fetchSearchApps = async (pageNum = 1, pageSize = 20, query) => {
        try {
            const queryData = {
                ...query,
                uid: userStore.uid
            }
            const resp = await searchApi.getSearchApp(pageNum, pageSize, queryData);
            searchApps.value = resp.data
            console.log("搜索结果：", searchApps.value);
            // 保存搜索历史（假设 query 中有 keyword 字段）
            if (query.keyword && query.keyword.trim() && authStore.isLogin) {
                console.log("搜索关键字：",query.keyword);
                
                await saveSearchHistory(query.keyword);
            }
        } catch (error) {
            // message.error("搜索应用失败");
        }
    }

    const fetchSearchHistory = async () => {
        try {
            const resp = await searchApi.getSearchHistory();
            searchHistory.value = resp.data
            console.log("搜索历史：", searchHistory.value);
            return searchHistory.value
        } catch (error) {
            message.error("获取搜索历史失败");
            return false
        }
    }

    const saveSearchHistory = async (keyword) => {
        try {
            await searchApi.saveSearchHistory(keyword);
            await fetchSearchHistory(); // 刷新历史记录
        } catch (error) {
            message.error("保存搜索历史失败");
        }
    }

    const fetchDeeleteHistoryItem = async (sid) => {
        try {
            await searchApi.deleteHistoryItem(sid);
            console.log("删除成功");
            await fetchSearchHistory(); // 重新获取历史记录
        } catch (error) {
            message.error("删除搜索历史失败");
        }
    }

    return {
        searchTips,
        searchApps,
        searchHistory,
        fetchSearchTips,
        fetchSearchApps,
        fetchSearchHistory,
        fetchDeeleteHistoryItem
    }

})