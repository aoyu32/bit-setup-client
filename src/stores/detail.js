import { defineStore } from "pinia";
import { ref } from 'vue'
import { detailApi } from "../apis/apis";
export const useDetailStore = defineStore('detail', () => {
    const detailData = ref({});
    const relatedData = ref([])
    const guessLikeData = ref([])

    const fetchAppDetail = (param) => {
        detailApi.getAppDetail(param).then(resp => {
            detailData.value = resp.data
            console.log(detailData.value);
            
        })
    }

    const fetchRelated=(param)=>{
        detailApi.getRelated(param).then(resp=>{
           relatedData.value = resp.data 
           console.log(relatedData.value);
           
        })
    }

    const fetchGuessLike=()=>{
        detailApi.getGuessLike().then(resp =>{
            guessLikeData.value =resp.data
            console.log(guessLikeData.value);
            
        })
    }

    return {
        detailData,
        relatedData,
        guessLikeData,
        fetchAppDetail,
        fetchRelated,
        fetchGuessLike
    }
})
