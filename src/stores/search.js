import { defineStore } from "pinia";
import { ref } from 'vue'
import { searchApi } from "../apis/apis";

export const useSearchStore = defineStore('search', () => {

    const searchTips = ref([])

    const fetchSearchTips = (param) => {
        searchApi.getSearchTips(param).then(resp => {
            searchTips.value = resp.data
            console.log(searchTips.value);
            
        })
    }


    return {
        searchTips,
        fetchSearchTips
    }

})
