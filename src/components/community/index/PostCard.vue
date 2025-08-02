<template>
    <div class="post-card">
        <div class="card-header">
            <div class="user-info">
                <div class="avatar">
                    <img :src="postData.user.avatar" :alt="postData.user.name">
                </div>
                <div class="info">
                    <div class="name">
                        <span>{{ postData.user.name }}</span>
                    </div>
                    <div class="level">
                        <span>{{ postData.user.level }}</span>
                        <span>Lv{{ postData.user.levelNum }}</span>
                        <span v-if="postData.user.isVip">VIP</span>
                    </div>
                </div>
            </div>
            <div class="tag">
                <i class="iconfont" :class="postData.tag.icon"></i>
                <span>{{ postData.tag.name }}</span>
            </div>
        </div>
        <div class="card-main">
            <div class="title">
                <span>{{ postData.title }}</span>
            </div>
            <div class="content">
                {{ postData.content }}
            </div>
            <div class="imgs" v-if="postData.images && postData.images.length > 0">
                <div class="img-item" v-for="(image, index) in postData.images" :key="index">
                    <img :src="image">
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="post-stats">
                <div class="status">
                    <div class="status-item like">
                        <i class="iconfont icon-dianzan"></i>
                        <span>{{ postData.stats.likes }}</span>
                    </div>
                    <div class="status-item comment">
                        <i class="iconfont icon-pinglun"></i>
                        <span>{{ postData.stats.comments }}</span>
                    </div>
                    <div class="status-item views">
                        <i class="iconfont icon-dianji"></i>
                        <span>{{ postData.stats.views }}</span>
                    </div>
                    <div class="status-item saves">
                        <i class="iconfont icon-shoucang"></i>
                        <span>{{ postData.stats.saves }}</span>
                    </div>
                </div>
                <div class="date">
                    <span>{{ postData.date }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 定义props
const props = defineProps({
    postData: {
        type: Object,
        required: true,
        default: () => ({
            user: {
                name: '',
                avatar: '',
                level: '',
                levelNum: 0,
                isVip: false
            },
            tag: {
                name: '',
                icon: ''
            },
            title: '',
            content: '',
            images: [],
            stats: {
                likes: 0,
                comments: 0,
                views: 0,
                saves: 0
            },
            date: ''
        })
    }
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/community/index/_post-card.scss' as *;
</style>