<template>
    <div class="author-card">
        <div class="author-header">
            <div class="author-info-wrapper">
                <div class="author-avatar">
                    <img src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Bella" alt="">
                </div>
                <div class="author-info">
                    <div class="name">
                        <span>我是aoyu</span>
                    </div>
                    <div class="level">
                        <span>无敌新手</span>
                        <span>Lv0</span>
                        <span>VIP</span>
                    </div>
                </div>
            </div>
            <div class="focus">
                <button>关注</button>
            </div>
        </div>
        <div class="author-bio">
            <p>该用户很懒，什么简介都没写！</p>
        </div>
        <div class="author-stats">
            <div class="stats">
                <div class="stats-item"><span>帖子：</span><span>100</span></div>
                <div class="stats-item"><span>获赞：</span><span>230</span></div>
                <div class="stats-item"><span>粉丝：</span><span>5</span></div>
                <div class="stats-item"><span>关注：</span><span>10</span></div>
            </div>
        </div>
    </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
@use '@/assets/styles/community/detail/_author-card.scss' as *;
</style>