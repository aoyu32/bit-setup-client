<template>
    <div class="sign-ranking">
        <ao-tabs :tabs="tabs" v-model="activeTab">
            <template #content>
                <div class="today-list" v-if="activeTab === 'today'">
                    <div class="ranking-list">
                        <AoTable :columns="todayColumns" :data="todayTableData" />
                    </div>
                    <div class="pagination">
                        <AoPagination :total="1200" @page-change="handlePageChange" :current-page-num="currentPage" />
                    </div>
                </div>
                <div class="continuation-list" v-if="activeTab === 'continuation'">
                    <div class="ranking-list">
                        <AoTable :columns="continuationColumns" :data="continuationTableData" />
                    </div>
                    <div class="pagination">
                        <AoPagination :total="1200" @page-change="handlePageChange" :current-page-num="currentPage" />
                    </div>
                </div>
                <div class="all-list" v-if="activeTab === 'all'">
                    <div class="ranking-list">
                        <AoTable :columns="allColumns" :data="allTableData" />
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
import { todayTableData, continuationTableData, allTableData } from '../../utils/sign-data'
const activeTab = ref('')
const currentPage = ref(20)

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

const todayColumns = ref([
    {
        key: 'ranking',
        title: '排名'
    },
    {
        key: 'username',
        title: '用户名'
    },
    {
        key: 'coin',
        title: '获得A币'
    },
    {
        key: 'date',
        title: '签到时间'
    }
])

const continuationColumns = ref([
    {
        key: 'ranking',
        title: '排名'
    },
    {
        key: 'username',
        title: '用户名',
    },
    {
        key: 'coin',
        title: '连续签到获得A币'
    },
    {
        key: 'days',
        title: '连续签到天数'
    }
])

const allColumns = ref([
    {
        key: 'ranking',
        title: '排名'
    },
    {
        key: 'username',
        title: '用户名'
    },
    {
        key: 'all',
        title: '总签到天数'
    }
    ,
    {
        key: 'coin',
        title: '获得的A币总数'
    }
])
const handlePageChange = (item) => {
    currentPage.value = item
}

</script>
<style lang="scss" scoped>
.sign-ranking {
    @include wh;
    @include b-r($b-r);
    box-shadow: shadow(m);

    @include c-t {
        background-color: color(c-g);
    }

    .today-list,
    .continuation-list,
    .all-list {
        @include wh;

    }


}
</style>