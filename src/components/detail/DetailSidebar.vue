<template>
    <div class="detail-sidebar">

        <div class="sidebar-top">
            <div class="related-list">
                <AoList :list="relatedList">
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
                        <div class="list-item">
                            <div class="item-left">
                                <div class="app-icon">
                                    <img :src="item.icon" alt="">
                                </div>
                                <div class="app-name">
                                    {{ item.name }}
                                </div>
                            </div>
                            <div class="item-right">
                                <div class="size info">
                                    <span><i class="iconfont icon-file-zip"></i></span>
                                    <span>{{ item.size }}</span>
                                </div>
                                <div class="download info">
                                    <span><i class="iconfont icon-download"></i></span>
                                    <span>{{ item.download }}</span>
                                </div>
                            </div>

                        </div>
                    </template>
                </AoList>
            </div>
            <div class="related-list" ref="likeListRef">
                <AoList :list="likeList">
                    <template #title>
                        <span><i class="iconfont icon-xihuan"></i></span>
                        <span>猜你喜欢</span>
                    </template>
                    <template #more>
                        <span>类别</span>
                    </template>
                    <template #item="{ item }">
                        <div class="list-item">
                            <div class="item-left">
                                <div class="app-icon">
                                    <img :src="item.icon" alt="">
                                </div>
                                <div class="app-name">
                                    {{ item.name }}
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
import { ref,onMounted,onUnmounted } from 'vue'
import AoList from '../common/AoList.vue';
import { likeList, relatedList } from '../../utils/detail-data';
// 在你的 Vue 组件中添加

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

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

</script>
<style lang="scss" scoped>
@use '@/assets/styles/detail/_detail-sidebar.scss' as *;
</style>