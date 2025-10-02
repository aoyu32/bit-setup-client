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
                    <div class="comment-label">
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
            <!-- 添加条件渲染 -->
            <div class="author-card-container" v-if="type === 'article' && hasAuthorData">
                <AuthorCard :data="authorData" />
            </div>
            <div class="recommend-list-container">
                <AoList :list="communityStore.recommendList" @item-click="handleItemClick">
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
                </AoList>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router';
import PostContent from '@/components/community/detail/PostContent.vue';
import Comment from '@/components/comment/Comment.vue';
import AoList from '@/components/common/aoList.vue';
import ArticleContent from '@/components/community/detail/ArticleContent.vue';
import AuthorCard from '@/components/community/detail/AuthorCard.vue';
import { useCommunityStore } from '../../stores/community';
import { useRouter } from 'vue-router';
const router = useRouter()
const communityStore = useCommunityStore()
const route = useRoute()
const type = ref(route.params.type)


// 安全的计算属性
const hasAuthorData = computed(() => {
    return communityStore.postDetail &&
        communityStore.postDetail.user &&
        communityStore.postDetail.user.uid
})

const handleItemClick = (item) => {
    const route = router.resolve({
        name: 'communityDetail',
        params: {
            type: item.category === '话题' || item.category === '求助' ? 'post' : 'article',
            id: item.pid
        }
    })
    window.open(route.href, '_blank')
}

const authorData = computed(() => {
    if (!hasAuthorData.value) {
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

    const user = communityStore.postDetail.user
    return {
        avatar: user.avatar || '',
        nickname: user.nickname || '',
        levelTitle: user.levelTitle || '',
        level: user.level || 0,
        role: user.role || '',
        bio: user.bio || '',
        postCount: user.postCount || 0,
        likeCount: user.likeCount || 0,
        fansCount: user.fansCount || 0,
        followCount: user.followCount || 0
    }
})

// 监听路由变化，加载数据
onMounted(() => {
    loadPostDetail()
    communityStore.fetchRecommendPost()
})

watch(() => route.params.id, (newId) => {
    if (newId) {
        loadPostDetail()
    }
})

const loadPostDetail = async () => {
    if (route.params.id) {
        await communityStore.fetchPostDetail(route.params.id)
    }
}
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