<template>
    <div class="author-card">
        <div class="author-header">
            <div class="author-info-wrapper">
                <div class="author-avatar">
                    <img :src="data.avatar" alt="">
                </div>
                <div class="author-info">
                    <div class="name">
                        <span>{{ data.nickname }}</span>
                    </div>
                    <div class="level">
                        <span>{{ data.levelTitle }}</span>
                        <span>Lv{{ data.level }}</span>
                        <span v-if="data.role === 'vip'">VIP</span>
                    </div>
                </div>
            </div>
            <div class="focus">
                <button>关注</button>
            </div>
        </div>
        <div class="author-bio">
            <p>{{ data.bio ? data.bio : '该用户很懒，没有任何简介！' }}</p>
        </div>
        <div class="author-stats">
            <div class="stats">
                <div class="stats-item"><span>帖子：</span><span>{{ data.postCount }}</span></div>
                <div class="stats-item"><span>获赞：</span><span>{{ data.likeCount }}</span></div>
                <div class="stats-item"><span>粉丝：</span><span>{{ data.fansCount }}</span></div>
                <div class="stats-item"><span>关注：</span><span>{{ data.followCount }}</span></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {
                avatar: '',
                nickname: '',
                levelTitle: '',
                level: 0,
                role: '',
                bio: '',
                postCount: 0,
                likeCount: 0,
                fansCount: 0,
                followCount: 0
            }
        }
    }
})
onMounted(() => {

})
</script>
<style lang="scss" scoped>
@use '@/assets/styles/community/detail/_author-card.scss' as *;
</style>