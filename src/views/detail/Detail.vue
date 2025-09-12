<template>
    <div class="detail">
        <div class="detail-left">
            <div class="left-top">
                <div class="detail-card-container">
                    <DetailCard />
                </div>
            </div>
            <div class="left-center">
                <div class="banner-container">
                    <div class="label">
                        <h3>应用截图</h3>
                    </div>
                    <AoBanner />
                </div>
                <div class="intro-container">
                    <DetailDocs docs="public/docs/app-intro.md">
                        <template #left>
                            <h3>应用介绍</h3>
                        </template>
                    </DetailDocs>
                </div>
                <div class="course-container">
                    <DetailDocs docs="public/docs/app-install.md">
                        <template #left>
                            <h3>安装教程</h3>
                        </template>
                    </DetailDocs>
                </div>
                <div class="other-version-container">
                    <div class="label">
                        <h3>其他版本</h3>
                    </div>
                    <OtherVersion />
                </div>
            </div>
            <div class="left-bottom">
                <div class="detail-comment-container">
                    <div class="label">
                        <h3>应用评论</h3>
                    </div>
                    <Comment />
                </div>
            </div>
        </div>
        <div class="detail-right">
            <div class="jumper-container top-jumper" v-show="isTopVisiable" ref="topJumperRef">
                <Jumper :jumper-items="jumperItems" />
            </div>
            <div class="sidebar-container">
                <DetailSidebar />
            </div>
            <div class="jumper-container bottom-jumper" v-show="!isTopVisiable" ref="bottomJumperRef">
                <Jumper :jumper-items="jumperItems" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import DetailCard from '@/components/detail/DetailCard.vue';
import AoBanner from '../../components/common/AoBanner.vue';
import DetailDocs from '../../components/detail/DetailDocs.vue';
import OtherVersion from '../../components/detail/OtherVersion.vue';
import Comment from '@/components/comment/Comment.vue'
import DetailSidebar from '../../components/detail/DetailSidebar.vue';
import Jumper from '../../components/detail/Jumper.vue';
const isTopVisiable = ref(true)
const isBottomVisiable = ref(true)
const topJumperRef = ref(null)
const bottomJumperRef = ref(null)
const jumperItems = ref([
    {
        icon: 'icon-renwu',
        name: '信息'
    },
    {
        icon: 'icon-tulie',
        name: '截图'
    },
    {
        icon: 'icon-fapiao',
        name: '介绍'
    },
    {
        icon: 'icon-tool',
        name: '安装'
    },
    {
        icon: 'icon-file-exe',
        name: '版本'
    },
    {
        icon: 'icon-pinglun',
        name: '评论'
    }
])
onMounted(() => {
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
            threshold: 0.5, // 50% 进入视口时触发
        }
    );

    observer.observe(topJumperRef.value);
    observer.observe(bottomJumperRef.value);
});

// 3. 停止监听（需要时）
// observer.unobserve(targetElement);
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