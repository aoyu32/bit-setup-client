<template>
    <div class="post-card">
        <div class="card-header">
            <div class="user-info">
                <div class="avatar">
                    <img :src="postData.user.avatar" :alt="postData.user.nickname">
                </div>
                <div class="info">
                    <div class="name">
                        <span>{{ postData.user.nickname }}</span>
                    </div>
                    <div class="level">
                        <span>{{ postData.user.levelTitle }}</span>
                        <span>Lv{{ postData.user.level }}</span>
                        <span v-if="postData.user.role === 'vip'">VIP</span>
                    </div>
                </div>
            </div>
            <div class="tag">
                <span><i class="iconfont" :class="postTagIcon"></i></span>
                <span>{{ postData.category }}</span>
            </div>
        </div>
        <component :is="postData.pid ? 'router-link' : 'div'"
            :to="postData.pid ? { name: 'communityDetail', params: { id: postData.pid, type: 'post' } } : null"
            class="card-main" target="_blank">
            <div class="card-main">
                <div class="title">
                    <span>{{ postData.title }}</span>
                </div>
                <div class="content">
                    {{ postData.summary }}
                </div>
                <div class="imgs" v-if="postData.images && postData.images.length > 0">
                    <div class="img-item" v-for="(image, index) in postData.images" :key="index">
                        <img :src="image" v-if="image !== ''">
                    </div>
                </div>
            </div>
        </component>
        <div class="card-footer">
            <div class="post-stats">
                <div class="status">
                    <div class="status-item like">
                        <i class="iconfont icon-dianzan"></i>
                        <span>{{ postData.likeCount }}</span>
                    </div>
                    <div class="status-item comment">
                        <i class="iconfont icon-pinglun"></i>
                        <span>{{ postData.commentCount }}</span>
                    </div>
                    <div class="status-item views">
                        <i class="iconfont icon-dianji"></i>
                        <span>{{ postData.viewCount }}</span>
                    </div>
                    <div class="status-item saves">
                        <i class="iconfont icon-shoucang"></i>
                        <span>{{ postData.collectCount }}</span>
                    </div>
                </div>
                <div class="date">
                    <span>{{ postData.publishTime }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()

// 定义props
const props = defineProps({
    postData: {
        type: Object,
        required: true,
        default: () => ({
            pid: '',
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

const postRoute = computed(() => {
    if (route.name === 'communityPost') {
        return {
            name: 'communityPost',
        }
    }
    if (route.name === 'communityDetail') {
        return {
            name: 'communityDetail',
            params: {
                type: 'post',
                id: props.postData.pid
            }
        }
    }

})

const postTagIcon = computed(() => {
    if (props.postData.category === '话题') {
        return 'icon-a-icon_huati'
    }
    if (props.postData.category === '求助') {
        return 'icon-bulb'
    }
    if (props.postData.category === '教程') {
        return 'icon-student'
    }
    if (props.postData.category === '文章') {
        return 'icon-zidian'
    }
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/community/index/_post-card.scss' as *;
</style>