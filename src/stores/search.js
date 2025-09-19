import { defineStore } from "pinia";
import { ref } from 'vue'
import { searchApi } from "../apis/apis";

export const useSearchStore = defineStore('search', () => {

    const searchTips = ref([])
    const searchApps = ref([])

    const fetchSearchTips = (param) => {
        searchApi.getSearchTips(param).then(resp => {
            searchTips.value = resp.data
            console.log(searchTips.value);

        })
    }

    const fetchSearchApps = (pageNum = 1, pageSize = 20, query) => {
        searchApi.getSearchApp(pageNum, pageSize, query).then(resp => {
            searchApps.value = resp.data
            console.log("搜索结果：", searchApps.value);

        })
    }


    return {
        searchTips,
        searchApps,
        fetchSearchTips,
        fetchSearchApps
    }

})
