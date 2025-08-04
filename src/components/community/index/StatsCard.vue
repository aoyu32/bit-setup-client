<template>
    <div class="stats-card">
        <div class="card-top">
            <div class="info">
                <div class="avatar">
                    <img src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=AppMaster" alt="">
                </div>
                <div class="level">
                    <span>无敌新手</span>
                    <span>Lv0</span>
                </div>
            </div>
            <div class="post">
                <router-link to="/community/post">发帖</router-link>
            </div>
        </div>
        <div class="card-bottom">
            <div class="stats">
                <div class="stats-item"><span>帖子：</span><span>100</span></div>
                <div class="stats-item"><span>获赞：</span><span>230</span></div>
                <div class="stats-item"><span>浏览：</span><span>2342</span></div>
                <div class="stats-item"><span>评论：</span><span>324</span></div>
                <div class="stats-item"><span>粉丝：</span><span>5</span></div>
                <div class="stats-item"><span>关注：</span><span>10</span></div>
            </div>
        </div>
    </div>
</template>
<script setup></script>
<style scoped lang="scss">
@use '@/assets/styles/community/index/_stats-card.scss' as *;
</style>
