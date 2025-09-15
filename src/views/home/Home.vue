<template>
    <div class="home">
        <div class="home-top">
            <div class="banner-container">
                <AoBanner />
            </div>
            <div class="control-panel-container">
                <ControlPanel />
            </div>
        </div>
        <div class="home-center">
            <div class="card-list-container">
                <div class="hot-list">
                    <CardList icon="icon-huo" color="color1" bg="a" :data="homeStore.hotList" title="热门" />
                </div>
                <div class="recommend-list">
                    <CardList icon="icon-xunzhang" color="color2" bg="b" title="推荐" :data="homeStore.recommendList" />
                </div>
                <div class="must-have">
                    <CardList icon="icon-asset-monitor" color="color3" bg="c" title="必备" :data="homeStore.mustList" />
                </div>
            </div>
        </div>
        <div class="home-bottom">
            <div class="list-label">
                <div class="label-left">
                    <span><i class="iconfont icon-shendusikao"></i></span>
                    <h3>发现APP</h3>
                </div>
                <div class="label-right">
                    <span>加载模式</span>
                </div>
            </div>
            <div class="app-list-container">
                <AppList ref="appListRef" :list="homeStore.appList" @loadMore="handleLoadMore" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import AoBanner from '@/components/common/AoBanner.vue';
import ControlPanel from '@/components/home/ControlPanel.vue';
import AppList from '@/components/home/AppList.vue';
import AppPage from '@/components/home/AppPage.vue';
import CardList from '@/components/home/CardList.vue';
import { useHomeStore } from '@/stores/home';

const homeStore = useHomeStore()
const appListRef = ref(null)

// 处理加载更多
const handleLoadMore = async () => {
    try {
        const newData = await homeStore.loadMoreAppList()

        // 设置加载完成状态
        if (appListRef.value) {
            appListRef.value.setLoading(false)

            // 如果没有更多数据，设置状态
            if (!homeStore.hasMoreData) {
                appListRef.value.setNoMoreData(true)
            }
        }
    } catch (error) {
        console.error('加载更多失败:', error)
        if (appListRef.value) {
            appListRef.value.setLoading(false)
        }
    }
}

//请求
onMounted(() => {
    homeStore.fetchHotList()
    homeStore.fetchRecommendList()
    homeStore.fetchMustHaveList()
    if (homeStore.appList.length === 0) {
        homeStore.fetchAppList(1, 20) // 首次加载20条数据
    }
})
</script>
<style lang="scss" scoped>
@use '@/assets/styles/home/home.scss' as *;
</style>