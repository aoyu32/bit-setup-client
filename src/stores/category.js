import { defineStore } from 'pinia'
import { ref } from 'vue'
import { categoryApi } from '@/apis/apis'
export const useCategoryStore = defineStore('category', () => {
    const fatherList = ref([])
    const childList = ref([])
    const appData = ref([])
    const fetchFaterList = (param) => {
        categoryApi.getFather(param).then(resp => {
            fatherList.value = resp.data
        })
    }

    const fetchChildList = (id) => {
        categoryApi.getChild(id).then(resp => {
            childList.value = resp.data
            console.log(childList.value);
            
        })
    }

    const fetchAppByFilter=(param)=>{
        categoryApi.getAppByFilter(param).then(resp =>{
            appData.value = resp.data
            console.log(appData.value);
            
        })
    }

    return {
        fatherList,
        childList,
        appData,
        fetchFaterList,
        fetchChildList,
        fetchAppByFilter
    }

})
