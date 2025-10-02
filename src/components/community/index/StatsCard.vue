<template>
    <div class="stats-card">
        <div class="card-top">
            <div class="info">
                <div class="avatar">
                    <img :src="data.avatar" alt="">
                </div>
                <div class="level">
                    <span>{{ data.levelTitle }}</span>
                    <span>Lv{{ data.level }}</span>
                </div>
            </div>
            <div class="post">
                <router-link to="/community/post">发帖</router-link>
            </div>
        </div>
        <div class="card-bottom">
            <div class="stats">
                <div class="stats-item"><span>帖子：</span><span>{{ data.postCount }}</span></div>
                <div class="stats-item"><span>获赞：</span><span>{{ data.likeCount }}</span></div>
                <div class="stats-item"><span>浏览：</span><span>{{ data.viewCount }}</span></div>
                <div class="stats-item"><span>评论：</span><span>{{ data.commentCount }}</span></div>
                <div class="stats-item"><span>粉丝：</span><span>{{ data.fansCount }}</span></div>
                <div class="stats-item"><span>关注：</span><span>{{ data.followCount }}</span></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {
                avatar: '',
                levelTitle: '',
                level: 0,
                postCount: 0,
                likeCount: 0,
                viewCount: 0,
                commentCount: 0,
                fansCount: 0,
                followCount: 0
            }
        }
    }
})
</script>
<style scoped lang="scss">
@use '@/assets/styles/community/index/_stats-card.scss' as *;
</style>
