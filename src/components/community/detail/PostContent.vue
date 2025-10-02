<template>
    <div class="post-content" v-if="communityStore.postDetail.user">
        <div class="post-content-header">
            <div class="header-left">
                <div class="avatar">
                    <img :src="communityStore.postDetail.user.avatar" alt="">
                </div>
                <div class="post-info">
                    <div class="name">
                        <span>{{ communityStore.postDetail.user.nickname }}</span>
                    </div>
                    <div class="level">
                        <span>{{ communityStore.postDetail.user.levelTitle }}</span>
                        <span>Lv{{ communityStore.postDetail.user.level }}</span>
                        <span v-if="communityStore.postDetail.user.role === 'vip'">VIP</span>
                    </div>
                </div>
            </div>
            <div class="header-right">
                <button>关注</button>
            </div>
        </div>
        <div class="post-content-main" v-if="communityStore.postDetail.post">
            <!-- <div class="title">
                <p>{{ communityStore.postDetail.post.title }}</p>
            </div> -->
            <div class="content">
                <AoMarkdwon :markdownData="communityStore.postDetail.post.content" />
            </div>
            <div class="imgs"
                v-if="communityStore.postDetail.post.images && communityStore.postDetail.post.images.length > 0">
                <div class="img-item" v-for="(image, index) in communityStore.postDetail.post.images" :key="index">
                    <img :src="image">
                </div>
            </div>
        </div>
        <div class="post-content-footer" v-if="communityStore.postDetail.post">
            <div class="status">
                <div class="status-item like">
                    <i class="iconfont icon-dianzan"></i>
                    <span>{{ communityStore.postDetail.post.likeCount }}</span>
                </div>
                <div class="status-item comment">
                    <i class="iconfont icon-pinglun"></i>
                    <span>{{ communityStore.postDetail.post.commentCount }}</span>
                </div>
                <div class="status-item saves">
                    <i class="iconfont icon-shoucang"></i>
                    <span>{{ communityStore.postDetail.post.collectCount }}</span>
                </div>
            </div>
            <div class="info">
                <div class="tag info-item">
                    <span><i class="iconfont icon-a-icon_huati"></i></span>
                    <span>{{ communityStore.postDetail.post.category }}</span>
                </div>
                <div class="views info-item">
                    <span><i class="iconfont icon-yuedu"></i></span>
                    <span>阅读：{{ communityStore.postDetail.post.viewCount }}</span>
                </div>
                <div class="date info-item">
                    <span><i class="iconfont icon-end-date"></i></span>
                    <span>{{ formatDate(communityStore.postDetail.post.publishTime) }}</span>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="loading">
        加载中...
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import AoMarkdwon from '@/components/common/AoMarkdwon.vue';
import { useRouter, useRoute } from 'vue-router';
const route = useRoute()
import { useCommunityStore } from '../../../stores/community';
const communityStore = useCommunityStore()

onMounted(() => {
    communityStore.fetchPostDetail(route.params.id)
})

// 格式化日期函数
const formatDate = (dateString) => {
    if (!dateString) return ''
    return dateString.split(' ')[0] // 只取日期部分
}
</script>
<style lang="scss" scoped>
@use '@/assets/styles/community/detail/_post-content.scss' as *;
</style>