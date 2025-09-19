<template>
    <div class="search-result">
        <div class="result-wrapper" v-if="data.total">
            <app-page :data="data" @page-change="handlePageChange" />
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
import { ref, onMounted } from 'vue'
import AppPage from '@/components/home/AppPage.vue';
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
onMounted(() => {
    

})
const emit = defineEmits(['page-change'])
const handlePageChange = (pageNum) => {
    emit('page-change', pageNum)
}

</script>
<style lang="scss" scoped>
@use '@/assets/styles/search/_search-result.scss' as *;
</style>