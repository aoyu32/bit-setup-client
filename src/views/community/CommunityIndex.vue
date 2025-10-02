<template>
    <div class="community-index">
        <div class="community-left" ref="communityLeftRef" :style="{ minHeight: communityLeftMinHeight }">
            <div class="community-nav-container">
                <CommunityNav @active-item="handleNavActiveItem" />
            </div>
            <div class="post-list-container">
                <PostList>
                    <component v-for="(item, index) in communityStore.postList" :postData="item" :key="index"
                        :is="getComponentByTag(item.category)">
                    </component>
                </PostList>
            </div>
        </div>
        <div class="community-right" ref="communityRightRef">
            <div class="right-content-wrapper" ref="rightContentWrapperRef">
                <div class="stats-card-container">
                    <StatsCard :data="statsCardData" />
                </div>
                <div class="hot-list-container">
                    <aoList :list="communityStore.hotList" @item-click="handleHotItemClick">
                        <template #title>
                            <span><i class="iconfont icon-huo"></i></span>
                            <span>热帖榜</span>
                        </template>
                        <template #more>
                            <span @click="showAll = !showAll">{{ !showAll ? '全部' : '收起' }}</span>
                        </template>
                        <template #item="{ item, index }">
                            <div class="content-wrapper">
                                <div class="order">{{ index + 1 }}</div>
                                <div class="content">{{ item.title }}</div>
                            </div>
                            <div class="views"><i class="iconfont icon-fire"></i>{{ item.viewCount }}</div>
                        </template>
                    </aoList>
                </div>
                <!-- <div class="author-list-container">
                    <AoList :list="goodAuthorsList">
                        <template #title>
                            <span><i class="iconfont icon-xunzhang"></i></span>
                            <span>优秀创作者</span>
                        </template>
                        <template #more>
                            <span>TOP 10</span>
                        </template>
                        <template #item="{ item, index }">
                            <div class="content-wrapper">
                                <div class="avatar">
                                    <img :src="item.avatar" alt="">
                                </div>
                                <div class="name">
                                    <span>{{ item.name }}</span>
                                </div>
                            </div>
                            <div class="author-data">
                                <div class="data-item">
                                    <span>发帖：</span>
                                    <span>{{ item.stats.posts }}</span>
                                </div>
                                <div class="data-item">
                                    <span>粉丝：</span>
                                    <span>{{ formatStats(item.stats).fans }}</span>
                                </div>
                                <div class="data-item">
                                    <span>获赞：</span>
                                    <span>{{ formatStats(item.stats).likes }}</span>
                                </div>

                            </div>
                        </template>
                    </AoList>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import CommunityNav from '@/components/community/index/CommunityNav.vue';
import PostList from '@/components/community/index/PostList.vue';
import PostCard from '@/components/community/index/PostCard.vue';
import ArticleCard from '@/components/community/index/ArticleCard.vue';
import postData from '../../utils/post-data';
import StatsCard from '@/components/community/index/StatsCard.vue';
import AoList from '../../components/common/AoList.vue';
import goodAuthorsList from '../../utils/good-author';
import { useCommunityStore } from '../../stores/community';
import { useUserInfoStore } from '../../stores/user';
const communityStore = useCommunityStore()
const userStore = useUserInfoStore()
import { useRouter } from 'vue-router';
const router = useRouter()

const statsCardData = computed(() => {
    return {
        avatar: userStore.userData.avatar,
        levelTitle: userStore.userData.levelTitle,
        level: userStore.userData.level,
        postCount: userStore.userData.postCount,
        likeCount: userStore.userData.likeCount,
        viewCount: userStore.userData.viewCount,
        commentCount: userStore.userData.commentCount,
        fansCount: userStore.userData.fansCount,
        followCount: userStore.userData.followCount
    }
})

const communityLeftRef = ref(null)
const communityRightRef = ref(null)
const rightContentWrapperRef = ref(null)
const communityLeftMinHeight = ref('')
const showAll = ref(false)
const hotPostsDisplay = computed(() => {
    return showAll.value ? hotPosts : hotPosts.slice(0, 10);
})

const handleHotItemClick = (item) => {
    const route = router.resolve({
        name: 'communityDetail',
        params: {
            type: item.category === '话题' || item.category === '求助' ? 'post' : 'article',
            id: item.pid
        }
    })
    window.open(route.href, '_blank')
}

const formatStats = (stats) => {
    return {
        fans: stats.fans >= 1000 ? (stats.fans / 1000).toFixed(1) + 'k' : stats.fans,
        likes: stats.likes >= 1000 ? (stats.likes / 1000).toFixed(1) + 'k' : stats.likes,
        posts: stats.posts
    }
}

const componentMap = {
    '话题': PostCard,
    '求助': PostCard,
    '文章': ArticleCard,
    '教程': ArticleCard
};
onMounted(() => {
    // communityLeftMinHeight.value = communityRightRef.value.getBoundingClientRect().height + 'px'
    communityStore.fetchPostListByCategory('all')
    //获取热帖
    communityStore.fetchHotPost()
})

// 直接监听 community-right 高度变化
watch(() => communityRightRef.value, (newVal) => {
    if (newVal) {
        nextTick(() => {
            const rightHeight = newVal.getBoundingClientRect().height;
            communityLeftMinHeight.value = rightHeight + 'px';
        });
    }
}, { immediate: true });
// 监听右侧内容变化（showAll 和 postFilterData）
watch([showAll], () => {
    if (communityRightRef.value) {
        nextTick(() => {
            const rightHeight = communityRightRef.value.getBoundingClientRect().height;
            communityLeftMinHeight.value = rightHeight + 'px';
        });
    }
});

const getComponentByTag = (tagName) => {
    return componentMap[tagName] || PostCard;
};

const currentItem = ref('all')

const handleNavActiveItem = (item) => {

    communityStore.fetchPostListByCategory(item)

}

const postFilterData = computed(() => {
    if (currentItem.value === '全部') {
        return postData
    }
    return postData.filter(item => item.tag.name === currentItem.value)
})
</script>
<style lang="scss" scoped>
.community-index {
    @include wh;
    @include flex;
    padding: 25px 0;
    position: relative;
    align-items: flex-start;

    .community-left {

        @include wh(70p, n);
        @include flex(n, n, c);
        margin-right: 20px;

        @include c-t {
            background-color: color(c-g);
        }
    }

    .community-right {
        @include wh(30p, n);
        @include flex(n, c, c);
        position: sticky;
        top: $header-height;


        .right-content-wrapper {
            @include flex (n, c, c);
        }
    }

    .community-nav-container {
        @include wh;

    }

    .post-list-container {
        @include wh;
    }

    .hot-list-container {
        margin-top: 20px;
        @include wh;
        position: relative;
        transition: transform 0.3s ease;

        .content-wrapper {
            @include flex;
            gap: 20px;

            .content {
                max-width: 230px;
                @include t-e;
            }

        }

        .views {
            font-size: 11px;
            gap: 5px;
            @include flex(c, c);

            .iconfont {
                font-size: 12px;
            }
        }

    }

    .author-list-container {
        margin-top: 20px;
        @include wh;
        transition: transform 0.3s ease;

        .content-wrapper {
            @include flex(c, c);
            gap: 6px;
            min-width: 50px;
            @include t-e;

            .avatar {
                @include wh(30);
                @include img;
            }
        }

        .author-data {
            @include flex;
            gap: 10px;
            font-size: 11px;
            @include t-e;
        }
    }


}

@media (max-width:1100px) {
    .community-index {
        @include wh;
        padding: 25px 0;
        position: relative;

        .community-left {
            @include wh(100p, n);
            @include flex(n, n, c);
             margin-right: 0px;

            @include c-t {
                background-color: color(c-g);
            }
        }

        .community-right {
            display: none;
        }
    }


}
</style>