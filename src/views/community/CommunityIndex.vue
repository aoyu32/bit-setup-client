<template>
    <div class="community-index">
        <div class="community-left">
            <div class="community-nav-container">
                <CommunityNav />
            </div>
            <div class="post-list-container">
                <PostList>
                    <PostCard v-for="(item, index) in postData" :postData="item" :key="index" />
                </PostList>
            </div>
        </div>
        <div class="community-right">
            <div class="stats-card-container">
                <StatsCard />
            </div>
        </div>
    </div>
</template>
<script setup>
import CommunityNav from '@/components/community/index/CommunityNav.vue';
import PostList from '@/components/community/index/PostList.vue';
import PostCard from '@/components/community/index/PostCard.vue';
import postData from '../../utils/post-data';
import StatsCard from '@/components/community/index/StatsCard.vue';
</script>
<style lang="scss" scoped>
.community-index {
    @include wh;
    @include flex;
    padding: 25px 0;

    .community-left {
        @include wh(70p, 100p);
        @include flex(n, t, c);
        margin-right: 20px;
    }

    .community-right {
        @include wh(30p, 100p);
    }

    .community-nav-container{
        @include wh;

    }

    .post-list-container {
        @include wh;
                
    }


}
</style>