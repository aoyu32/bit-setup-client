<template>
    <div class="detail">
        <div class="detail-left">
            <div class="left-top">
                <div class="detail-card-container" ref="infoSection">
                    <DetailCard :data="detailStore.detailData" />
                </div>
            </div>
            <div class="left-center">
                <div class="banner-container" ref="screenshotSection">
                    <div class="label">
                        <h3>应用截图</h3>
                    </div>
                    <AoBanner />
                </div>
                <div class="intro-container" ref="introSection">
                    <DetailDocs :docs="detailStore.detailData.introductionText">
                        <template #left>
                            <h3>应用介绍</h3>
                        </template>
                    </DetailDocs>
                </div>
                <div class="course-container" ref="installSection">
                    <DetailDocs :docs="detailStore.detailData.installGuide">
                        <template #left>
                            <h3>安装教程</h3>
                        </template>
                    </DetailDocs>
                </div>
                <div class="other-version-container" ref="versionSection">
                    <div class="label">
                        <h3>其他版本</h3>
                    </div>
                    <OtherVersion :data="detailStore.detailData.otherVersions" :app="appInfo" />
                </div>
            </div>
            <div class="left-bottom">
                <div class="detail-comment-container" ref="commentSection">
                    <div class="label">
                        <h3>应用评论</h3>
                    </div>
                    <Comment :commentList="commentStore.appCommentList"/>
                </div>
            </div>
        </div>
        <div class="detail-right">
            <div class="jumper-container top-jumper" v-show="isTopVisiable" ref="topJumperRef">
                <Jumper :jumper-items="jumperItems" @jump-to="handleJumpToWithCustomOffset" />
            </div>
            <div class="sidebar-container">
                <DetailSidebar :data="sidebarData" />
            </div>
            <div class="jumper-container bottom-jumper" v-show="!isTopVisiable" ref="bottomJumperRef">
                <Jumper :jumper-items="jumperItems" @jump-to="handleJumpToWithCustomOffset" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted, nextTick, provide } from 'vue'
import DetailCard from '@/components/detail/DetailCard.vue';
import AoBanner from '../../components/common/AoBanner.vue';
import DetailDocs from '../../components/detail/DetailDocs.vue';
import OtherVersion from '../../components/detail/OtherVersion.vue';
import Comment from '@/components/comment/Comment.vue'
import DetailSidebar from '../../components/detail/DetailSidebar.vue';
import Jumper from '../../components/detail/Jumper.vue';
import { useDetailStore } from '@/stores/detail.js'
import { useRoute } from 'vue-router';
import { useCommentStore } from '../../stores/comment';
import message from '../../utils/message';
const commentStore = useCommentStore()
const route = useRoute()
const detailStore = useDetailStore()
const isTopVisiable = ref(true)
const topJumperRef = ref(null)
const bottomJumperRef = ref(null)

// 添加各个区域的引用
const infoSection = ref(null)
const screenshotSection = ref(null)
const introSection = ref(null)
const installSection = ref(null)
const versionSection = ref(null)
const commentSection = ref(null)


const handleCommentSubmit = async (replyData) => {
    console.log("发送的评论数据：", replyData);
    const reqData = {
        ...replyData,
        targetId: appId.value,
    }
    const success = await commentStore.fetchAddComment('app',reqData)
    if (success) {
        return true
    }else{
        return false
    }
}

provide('onSubmit', handleCommentSubmit)
const jumperItems = ref([
    {
        icon: 'icon-renwu',
        name: '信息',
        target: 'info'
    },
    {
        icon: 'icon-tulie',
        name: '截图',
        target: 'screenshot'
    },
    {
        icon: 'icon-fapiao',
        name: '介绍',
        target: 'intro'
    },
    {
        icon: 'icon-tool',
        name: '安装',
        target: 'install'
    },
    {
        icon: 'icon-file-exe',
        name: '版本',
        target: 'version'
    },
    {
        icon: 'icon-pinglun',
        name: '评论',
        target: 'comment'
    }
])

// 简化版：可配置偏移量 + 缓出滚动动画
const scrollOffsetConfig = {
    info: 100,
    screenshot: 100,
    intro: 100,
    install: 100,
    version: 100,
    comment: 100
}

// 缓出效果：开始快，逐渐变慢
const easeOut = (t) => {
    return 1 - Math.pow(1 - t, 2)
}

const handleJumpToWithCustomOffset = (target) => {
    const sectionMap = {
        'info': infoSection,
        'screenshot': screenshotSection,
        'intro': introSection,
        'install': installSection,
        'version': versionSection,
        'comment': commentSection
    }

    const targetRef = sectionMap[target]
    if (targetRef?.value) {
        const targetElement = targetRef.value
        const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset
        const offset = scrollOffsetConfig[target] || 100
        const offsetPosition = elementTop - offset

        // 自定义平滑滚动
        const startPosition = window.pageYOffset
        const distance = offsetPosition - startPosition
        const duration = 500 // 滚动时长
        let start = null

        const step = (timestamp) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const ease = easeOut(progress)

            window.scrollTo(0, startPosition + distance * ease)

            if (progress < 1) {
                requestAnimationFrame(step)
            }
        }

        requestAnimationFrame(step)
    }
}
const sidebarData = computed(() => ({
    related: detailStore.relatedData,
    guess: detailStore.guessLikeData
}))

const appInfo = computed(() => {
    return {
        appName: detailStore.detailData.appName,
        icon: detailStore.detailData.iconUrl,
        points: detailStore.detailData.points
    }
})

const appId = computed(() => {
    return detailStore.detailData.appId
})

onMounted(async () => {
    //请求详情数据
    await detailStore.fetchAppDetail(route.params.id);
    await detailStore.fetchRelated(route.params.id)
    await detailStore.fetchGuessLike()
    await commentStore.fetchCommentList("app",route.params.id)


    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.target.classList.contains("top-jumper")) {
                    isTopVisiable.value = entry.isIntersecting;
                } else if (entry.target.classList.contains("bottom-jumper")) {
                    isTopVisiable.value = !entry.isIntersecting;
                }
            });
        },
        {
            threshold: 0.5,
        }
    );

    observer.observe(topJumperRef.value);
    observer.observe(bottomJumperRef.value);
});

</script>

<style lang="scss" scoped>
.detail {
    @include wh(100p, 100p);
    @include flex;
    gap: 20px;
    position: relative;

    .detail-left {
        @include wh(70p, 100p);
        @include flex(n, n, c);

        .left-top {
            margin: 20px 0;
        }

        .left-center {
            @include flex(n, n, c);
            gap: 20px;
        }

        .label {
            padding-bottom: 20px;
            margin-bottom: 20px;

            @include c-t {
                border-bottom: 1px solid color(c-g9, 0.1);
            }
        }

        .banner-container {
            padding: 20px;
            box-shadow: shadow(m);
            @include b-r($b-r);

            @include c-t {
                background-color: color(c-g0);
            }
        }

        .other-version-container {
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: shadow(m);
            @include b-r($b-r);

            @include c-t {
                background-color: color(c-g0);
            }
        }

        .left-bottom {
            @include wh;
            padding: 20px;
            box-shadow: shadow(m);
            @include b-r($b-r);

            .label {
                margin-bottom: 0;
            }

            @include c-t {
                background-color: color(c-g0);
            }
        }
    }

    .detail-right {
        position: relative;
        @include wh(30p, 100p);
        @include flex(n, n, c);
        position: sticky;
        top: 72px;
        margin-top: 20px;

        .sidebar-container {
            @include wh(100p, 100p);
        }

        .top-jumper {
            margin-bottom: 20px;
        }

        .bottom-jumper {
            margin-top: 20px;
        }
    }
}
</style>