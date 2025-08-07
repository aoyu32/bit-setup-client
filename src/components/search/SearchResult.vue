<template>
    <div class="search-result">
        <div class="result-wrapper" v-if="hasResult">
            <AppList />
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
import { ref } from 'vue'
import AppList from '@/components/home/AppList.vue';
const hasResult = ref(false)
</script>
<style lang="scss" scoped>
@use '@/assets/styles/search/_search-result.scss' as *;
</style>