<template>
    <div class="community-detail">
        <div class="detail-left">
            <div class="detail-content">
                <div class="post-content-container" v-if="type === 'post'">
                    <PostContent />
                </div>
                <div class="article-content-container" v-if="type === 'article'">
                    <ArticleContent />
                </div>
            </div>
            <div class="post-comment">
                <div class="post-comment-header">
                    <div class="comment-lable">
                        <span>评论</span>
                    </div>
                    <div class="comment-order">
                        <button>最新</button>
                        <button>最热</button>
                    </div>
                </div>
                <div class="comment-container">
                    <Comment />
                </div>
            </div>
        </div>
        <div class="detail-right">
            <div class="author-card-container" v-if="type==='article'">
                <AuthorCard />
            </div>
            <div class="recommend-list-container">
                <RankingList :ranking-list="hotPosts">
                    <template #title>
                        <span><i class="iconfont icon-huo"></i></span>
                        <span>推荐内容</span>
                    </template>
                    <template #more>
                    </template>
                    <template #item="{ item, index }">
                        <div class="content-wrapper">
                            <div class="content">{{ item.title }}</div>
                        </div>
                    </template>
                </RankingList>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import PostContent from '@/components/community/detail/PostContent.vue';
import Comment from '@/components/comment/Comment.vue';
import RankingList from '../../components/community/index/RankingList.vue';
import ArticleContent from '@/components/community/detail/ArticleContent.vue';
import AuthorCard from '@/components/community/detail/AuthorCard.vue';
const hotPosts = [
    { id: 1, title: '2023安卓应用商店排行榜TOP10', views: 5420 },
    { id: 2, title: '微信多开方法汇总（附防封号指南）', views: 4870 },
    { id: 3, title: '最新版抖音国际版TikTok下载安装教程', views: 4650 },
    { id: 4, title: '警惕！这些"清理大师"APP会窃取数据,这些"清理大师"APP会窃取数据', views: 4320 },
    { id: 5, title: 'iOS17免越狱安装第三方应用教程', views: 3980 },
    { id: 6, title: 'Chrome浏览器必备的12个扩展插件', views: 3760 },
    { id: 7, title: '如何合法获取付费APP的免费试用', views: 3540 },
    { id: 3, title: '最新版抖音国际版TikTok下载安装教程', views: 4650 },
    { id: 4, title: '警惕！这些"清理大师"APP会窃取数据,这些"清理大师"APP会窃取数据', views: 4320 },
    { id: 5, title: 'iOS17免越狱安装第三方应用教程', views: 3980 },
    { id: 6, title: 'Chrome浏览器必备的12个扩展插件', views: 3760 },
    { id: 7, title: '如何合法获取付费APP的免费试用', views: 3540 },
    { id: 3, title: '最新版抖音国际版TikTok下载安装教程', views: 4650 },
    { id: 4, title: '警惕！这些"清理大师"APP会窃取数据,这些"清理大师"APP会窃取数据', views: 4320 },
    { id: 5, title: 'iOS17免越狱安装第三方应用教程', views: 3980 },
    { id: 6, title: 'Chrome浏览器必备的12个扩展插件', views: 3760 },
    { id: 7, title: '如何合法获取付费APP的免费试用', views: 3540 },

]
const route = useRoute()
const type = ref(route.params.type)

</script>
<style lang="scss" scoped>
.community-detail {
    @include wh(100p, 100p);
    @include flex;
    margin-top: 20px;
    gap: 20px;
    position: relative;


    .detail-left {
        @include wh(70p, n);
    }

    .detail-content {
        @include wh(100p, n);

        @include c-t {
            background-color: color(c-g);
        }
    }

    .detail-right {
        @include wh(30p, 100p);
        position: sticky;
        top: $header-height;
        @include flex(n, n, c);

    }


    .post-comment {
        margin-top: 20px;
        padding: 20px;
        @include flex(n, n, c);
        @include wh(100p, n);
        min-height: 100vh;

        @include c-t {
            background-color: color(c-g);
        }

        .post-comment-header {
            @include wh(100p, 100p);
            @include flex(n, s-b);

            .comment-order {
                @include flex;
                font-size: 14px;
                gap: 15px;

                button {
                    transition: color 0.2s ease-in;

                    @include c-t {
                        color: color(c-g9, 0.5);
                    }

                    &:hover {
                        @include c-t {
                            color: color(c-p-lighter);
                        }
                    }
                }
            }
        }

    }

}
</style>