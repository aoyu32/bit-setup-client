<template>
    <div class="sign-ranking">
        <ao-tabs :tabs="tabs" v-model="activeTab">
            <template #content>
                <div class="today-list">
                    <div class="ranking-list">
                        <AoTable :columns="columns" :data="tableData" />
                    </div>
                    <div class="pagination">
                        <AoPagination :total="1200" @page-change="handlePageChange" :current-page-num="currentPage" />
                    </div>
                </div>
            </template>
        </ao-tabs>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoTabs from '@/components/common/AoTabs.vue'
import AoPagination from '../common/AoPagination.vue'
import AoTable from '../common/AoTable.vue'
const activeTab = ref('')
const currentPage = ref(20)
const columns = ref([{ key: 'id', title: 'ID' },
{ key: 'name', title: '姓名' },
{ key: 'age', title: '年龄' },
{ key: 'email', title: '邮箱' }])
const tableData = ref([{ id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
{ id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
{ id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }])
const tabs = ref([
    {
        label: '今日签到榜',
        key: 'today'
    },
    {
        label: '连续签到榜',
        key: 'continuation'
    },
    {
        label: '总签到榜',
        key: 'all'
    }
])

const handlePageChange = (item) => {
    currentPage.value = item
}

</script>
<style lang="scss" scoped>
.sign-ranking {
    @include wh;
    
    @include c-t{
        background-color: color(c-g);
    }

    .today-list{
        @include wh;
    }


}
</style>