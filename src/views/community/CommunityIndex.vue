<template>
    <div class="community-index">
        <div class="community-left" ref="communityLeftRef" :style="{ minHeight: communityLeftMinHeight }">
            <div class="community-nav-container">
                <CommunityNav @active-item="handleNavActiveItem" />
            </div>
            <div class="post-list-container">
                <PostList>
                    <component v-for="(item, index) in postFilterData" :postData="item" :key="index"
                        :is="getComponentByTag(item.tag.name)">
                    </component>
                </PostList>
            </div>
        </div>
        <div class="community-right" ref="communityRightRef">
            <div class="right-content-wrapper" ref="rightContentWrapperRef">
                <div class="stats-card-container">
                    <StatsCard />
                </div>
                <div class="hot-list-container">
                    <RankingList :rankingList="hotPostsDisplay">
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
                            <div class="views"><i class="iconfont icon-fire"></i>{{ item.views }}</div>
                        </template>
                    </RankingList>
                </div>
                <div class="author-list-container">
                    <RankingList :rankingList="goodAuthorsList">
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
                    </RankingList>
                </div>
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
import RankingList from '../../components/community/index/RankingList.vue';
import goodAuthorsList from '../../utils/good-author';
const hotPosts = [
    { id: 1, title: '2023安卓应用商店排行榜TOP10', views: 5420 },
    { id: 2, title: '微信多开方法汇总（附防封号指南）', views: 4870 },
    { id: 3, title: '最新版抖音国际版TikTok下载安装教程', views: 4650 },
    { id: 4, title: '警惕！这些"清理大师"APP会窃取数据,这些"清理大师"APP会窃取数据', views: 4320 },
    { id: 5, title: 'iOS17免越狱安装第三方应用教程', views: 3980 },
    { id: 6, title: 'Chrome浏览器必备的12个扩展插件', views: 3760 },
    { id: 7, title: '如何合法获取付费APP的免费试用', views: 3540 },
    { id: 8, title: 'PUBG手游国际服延迟优化方案', views: 3320 },
    { id: 9, title: 'Spotify会员正版低价订阅渠道', views: 3100 },
    { id: 10, title: '2023年最稳定的5款VPN推荐', views: 2870 },
    { id: 11, title: '华为手机安装Google服务全攻略', views: 2650 },
    { id: 12, title: 'Adobe全家桶官方正版优惠购买指南', views: 2430 },
    { id: 13, title: 'Telegram优质资源频道推荐清单', views: 2210 },
    { id: 14, title: 'Windows11运行安卓APP完整教程', views: 1990 },
    { id: 15, title: '替代迅雷的8款下载工具对比', views: 1770 },
]

const communityLeftRef = ref(null)
const communityRightRef = ref(null)
const rightContentWrapperRef = ref(null)
const communityLeftMinHeight = ref('')
const showAll = ref(false)
const hotPostsDisplay = computed(() => {
    return showAll.value ? hotPosts : hotPosts.slice(0, 10);
})

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

const currentItem = ref('全部')

const handleNavActiveItem = (item) => {
    console.log(item);

    currentItem.value = item
    console.log(currentItem.value);

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
        @include flex(n, t, c);
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
        position: relative; // 添加相对定位
        transition: transform 0.3s ease; // 添加过渡效果

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
        transition: transform 0.3s ease; // 添加过渡效果

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
</style>