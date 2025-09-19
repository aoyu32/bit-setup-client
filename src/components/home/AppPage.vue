<template>
    <div class="app-page">
        <div class="list-wrapper">
            <AppCard v-for="app in data.list" :key="app.id" :app="app" />
        </div>
        <div class="pagination">
            <!-- <AoVPage/> -->
            <AoPagination :current-page-num="currentPageNum" :page-size="data.pageSize" :max-page-num="7"
                :total="data.total" @page-change="handlePageChange" />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import AppCard from './AppCard.vue';
import AoLoadding from '../../components/common/AoLoadding.vue';
import AoPagination from '../common/AoPagination.vue';
const currentPageNum = ref(1)
const props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {
                list: [],
                pageSize: 0,
                total: 0
            }
        }
    }
})
const emit = defineEmits(["page-change"])
const handlePageChange = (item) => {
    currentPageNum.value = item
    emit("page-change", currentPageNum.value)
    console.log("pageChange",currentPageNum.value);
    
}

</script>
<style scoped lang="scss">
.app-list {
    @include wh;
    @include flex(c, c, c);
    gap: 50px;
}

.list-wrapper {
    @include wh;
    @include grid(auto-fill, minmax(200px, 1fr), 70px);
}

.pagination {
    @include wh(100p, 100px);
    margin: 20px 0;
}
</style>