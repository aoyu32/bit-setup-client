<template>
    <div class="article-content" v-if="communityStore.postDetail.post">
        <div class="article-header">
            <div class="title">
                <h1>{{ communityStore.postDetail.post.title }}</h1>
            </div>
            <div class="info">
                <div class="tag info-item">
                    <span><i class="iconfont icon-a-icon_huati"></i></span>
                    <span>{{ communityStore.postDetail.post.category }}</span>
                </div>
                <div class="date info-item">
                    <span><i class="iconfont icon-end-date"></i></span>
                    <span>{{ formatDate(communityStore.postDetail.post.publishTime) }}</span>
                </div>
                <div class="views info-item">
                    <span><i class="iconfont icon-yuedu"></i></span>
                    <span>阅读：{{ communityStore.postDetail.post.viewCount }}</span>
                </div>
            </div>
        </div>
        <div class="article-main">
            <!-- 这里用计算属性替换 -->
            <AoMarkdwon :markdownData="processedContent" />
        </div>
        <div class="article-footer">
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
            <div class="action">
                <div class="more">
                    <span><i class="iconfont icon-ellipsis-vertical"></i></span>
                </div>
                <div class="more-menu">
                    <div class="report">
                        <span><i class="iconfont icon-warning"></i></span>
                        <span>举报</span>
                    </div>
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
import { useRoute } from 'vue-router';
import { useCommunityStore } from '../../../stores/community';

const route = useRoute()
const communityStore = useCommunityStore()

onMounted(() => {
    communityStore.fetchPostDetail(route.params.id)
})

// 格式化日期函数
const formatDate = (dateString) => {
    if (!dateString) return ''
    return dateString.split(' ')[0]
}

// 计算属性：去掉一级标题
const processedContent = computed(() => {
    const content = communityStore.postDetail.post?.content || ''
    // 按行拆分，判断第一行是不是一级标题（# 开头）
    const lines = content.split('\n')
    if (lines.length > 0 && /^#\s+/.test(lines[0])) {
        return lines.slice(1).join('\n').trim()
    }
    return content
})
</script>


<style lang="scss" scoped>
// 确保引用的是新的样式文件
@use '@/assets/styles/community/detail/_article-content.scss' as *;

// 可以在这里添加一些加载中的基本样式
.loading {
    text-align: center;
    padding: 20px;
    color: #999;
}
</style>