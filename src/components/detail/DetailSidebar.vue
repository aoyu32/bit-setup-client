<template>
    <div class="detail-sidebar">

        <div class="sidebar-top">
            <div class="related-list">
                <AoList :list="data.related">
                    <template #title>
                        <span><i class="iconfont icon-file-exe"></i></span>
                        <span>相关推荐</span>
                    </template>
                    <template #more>
                        <div class="tip">
                            <span>大小</span>
                            <span>下载量</span>
                        </div>
                    </template>
                    <template #item="{ item }">
                        <div class="list-item" @click="handleAppClick(item.appId)">
                            <div class="item-left">
                                <div class="app-icon">
                                    <img :src="item.iconUrl" alt="">
                                </div>
                                <div class="app-name">
                                    {{ item.appName }}
                                </div>
                            </div>
                            <div class="item-right">
                                <div class="size info">
                                    <span><i class="iconfont icon-file-zip"></i></span>
                                    <span>{{ Math.floor(item.size / 1024) }}</span>
                                </div>
                                <div class="download info">
                                    <span><i class="iconfont icon-download"></i></span>
                                    <span>{{ item.downloadCount }}</span>
                                </div>
                            </div>

                        </div>
                    </template>
                </AoList>
            </div>
            <div class="related-list" ref="likeListRef">
                <AoList :list="data.guess">
                    <template #title>
                        <span><i class="iconfont icon-xihuan"></i></span>
                        <span>猜你喜欢</span>
                    </template>
                    <template #more>
                        <span>类别</span>
                    </template>
                    <template #item="{ item }">
                        <div class="list-item" @click="handleAppClick(item.appId)">
                            <div class="item-left">
                                <div class="app-icon">
                                    <img :src="item.iconUrl" alt="">
                                </div>
                                <div class="app-name">
                                    {{ item.appName }}
                                </div>
                            </div>
                            <div class="item-right">
                                <div class="app-category">
                                    <span>{{ item.category }}</span>
                                </div>
                            </div>

                        </div>
                    </template>
                </AoList>
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AoList from '../common/AoList.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
// 在你的 Vue 组件中添加
const props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {
                related: [],
                guess: []
            }
        }
    }
})
const likeListRef = ref(null)

const handleScroll = () => {
    const likeListEl = likeListRef.value
    if (!likeListEl) return

    const rect = likeListEl.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // 当列表完整显示在视口中时，添加粘性定位
    if (rect.top <= windowHeight - rect.height) {
        likeListEl.classList.add('is-sticky')
    } else {
        likeListEl.classList.remove('is-sticky')
    }
}

const handleAppClick = (appId) => {
    const routeData = router.resolve(`/detail/${appId}`)
    window.open(routeData.href, '_blank')
}

onMounted(() => {
    console.log(props.data);

    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

</script>
<style lang="scss" scoped>
@use '@/assets/styles/detail/_detail-sidebar.scss' as *;
</style>