<template>
    <div class="search-result">
        <div class="result-wrapper" v-if="hasResult">
            <AppList :list="homeStore.appList"/>
        </div>
        <div class="void-result-wrapper" v-else>
            <div class="no-data-img">
                <img src="../../assets/imgs/no-data.svg" alt="">
            </div>
            <p>抱歉！没有你想要的结果呀~</p>
        </div>
    </div>
</template>
<script setup>
import { ref,onMounted } from 'vue'
import AppList from '@/components/home/AppList.vue';
const hasResult = ref(true)
import { useHomeStore } from '@/stores/home.js'
const homeStore = useHomeStore()
onMounted(()=>{
    homeStore.fetchAppList()
})


</script>
<style lang="scss" scoped>
@use '@/assets/styles/search/_search-result.scss' as *;
</style>