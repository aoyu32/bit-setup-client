import { defineStore } from "pinia";
import { ref } from 'vue'
import { appApi } from "@/apis/apis";

export const useHomeStore = defineStore('home', () => {

    const hotList = ref([])
    const recommendList = ref([])
    const mustList = ref([])

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

    

    return {
        hotList,
        recommendList,
        mustList,
        fetchHotList,
        fetchRecommendList,
        fetchMustHaveList
    }

})