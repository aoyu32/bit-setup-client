<template>
    <div class="control-panel">
        <div class="panel-top">
            <div class="actions">
                <div class="title">
                    <span>快捷操作</span>
                </div>
                <div class="actions-wrapper">
                    <router-link class="action-item" v-for="(item, index) in actionList" :to="item.route" :key="index">
                        <span><i :class="['iconfont', item.icon]"></i></span>
                        <span>{{ item.name }}</span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="panel-center">
            <div class="themes">
                <div class="title">
                    <span>主题切换</span>
                </div>
                <div class="themes-wrapper">
                    <div class="theme-select">
                        <div class="select-header">
                            <span class="select-value"><i class="iconfont icon-tiaosepan"></i>默认主题</span>
                            <span class="arrow-icon"><i class="iconfont icon-xiangxia-1"></i></span>
                        </div>
                        <div class="select-options">

                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="panel-bottom">
            <div class="modes">
                <div class="title">
                    <span>浏览模式</span>
                </div>
                <div class="modes-wrapper">
                    <button v-for="(item, index) in modes"><i :class="['iconfont', item.icon]" :key="index"></i><span>{{
                        item.name
                            }}</span></button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const actionList = ref([
    {
        icon: 'icon-xiaoxi',
        name: '系统通知',
        route: '/notice'
    },
    {
        icon: 'icon-rili',
        name: '每日签到',
        route: '/signin'
    },
    {
        icon: 'icon-cloud-upload',
        name: '我要上传',
        route: 'submit'
    },
    {
        icon: 'icon-yaoqinghan',
        name: '意见反馈',
        route: '/feedback'
    }
])

const modes = ref([
    {
        icon: '',
        name: '随机浏览'
    },
    {
        icon: '',
        name: '分页查看'
    },
    {
        icon: '',
        name: '分类模式'
    }
])

</script>
<style scoped lang="scss">
.control-panel {
    @include wh-100;
    @include flex-jcsb;
    flex-direction: column;

    .title {
        width: 100%;
        padding: 8px 10px;
        border: 1px solid color.adjust($theme-secondary, $lightness: 15%, $alpha: -0.3);
        border-bottom: 0;
        border-radius: 6px 6px 0px 0px;
        font-size: 14px;
        background-color: color.adjust($theme-secondary, $lightness: 30%, $alpha: -0.5);
        color: color.adjust($theme-secondary, $lightness: 0%);
        font-weight: 600;

        span {
            display: flex;
            @include wh-100;
            border-left: 2px solid $theme-secondary;
            padding-left: 5px;
        }
    }

    .panel-top {
        width: 100%;
        background-color: color.adjust($color-light, $lightness: 0%, $alpha: 0.3);

        .actions-wrapper {
            width: 100%;
            border: 1px solid color.adjust($theme-secondary, $lightness: 15%, $alpha: -0.3);
            display: grid;
            gap: 10px;
            padding: 10px 15px;
            grid-template-columns: repeat(2, 1fr);
            border-radius: 0px 0px 6px 6px;
            background: linear-gradient(135deg, $color-light 0%, color.adjust($theme-secondary, $lightness: 40%, $alpha: -0.9) 100%);
            box-shadow: inset 0 1px 3px rgba(218, 112, 214, 0.1);
        }

        .actions {
            .action-item {
                padding: 10px;
                border: 1px solid color.adjust($theme-secondary, $lightness: 20%, $alpha: -0.4);
                border-radius: $border-radius;
                gap: 5px;
                font-size: 14px;
                @include flex-fcc;
                color: color.adjust($theme-secondary, $lightness: 0%);
                background: linear-gradient(135deg, $color-light 0%, color.adjust($theme-secondary, $lightness: 38%, $alpha: -0.85) 100%);
                box-shadow: $shadow-sm;
                transition: all 0.3s ease;
                text-decoration: none;

                &:hover {
                    background: linear-gradient(135deg, color.adjust($theme-secondary, $lightness: 35%) 0%, color.adjust($theme-secondary, $lightness: 25%) 100%);
                    color: $color-light;
                    border-color: $theme-primary;
                    box-shadow: $shadow-md;
                    transform: translateY(-1px);
                }

                .iconfont {
                    font-size: 20px;
                    color: color.adjust($theme-primary, $lightness: -10%);
                }

                &:hover .iconfont {
                    color: $color-light;
                }
            }

        }
    }

    .panel-center {
        width: 100%;
        background: linear-gradient(135deg, color.adjust($color-light, $lightness: -2%) 0%, color.adjust($color-light, $lightness: -5%) 100%);

        .themes {
            width: 100%;
        }

        .themes-wrapper {
            width: 100%;
            padding: 10px 15px;
            border: 1px solid color.adjust($theme-secondary, $lightness: 15%, $alpha: -0.3);
            border-radius: 0px 0px 6px 6px;
            background: linear-gradient(135deg, $color-light 0%, color.adjust($theme-secondary, $lightness: 40%, $alpha: -0.9) 100%);
            box-shadow: inset 0 1px 3px rgba(218, 112, 214, 0.1);
        }

        .theme-select {
            width: 100%;
            border: 1px solid color.adjust($theme-secondary, $lightness: 20%, $alpha: -0.4);
            padding: 10px;
            border-radius: $border-radius;
            background: linear-gradient(135deg, $color-light 0%, color.adjust($theme-secondary, $lightness: 38%, $alpha: -0.85) 100%);
            box-shadow: $shadow-sm;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                border-color: $theme-primary;
                box-shadow: $shadow-md;
            }

            .select-header {
                @include wh-100;
                @include flex-jcsb;
                font-size: 15px;
                color: color.adjust($theme-secondary, $lightness: 0%);

                span {
                    @include flex-c;
                }

                .select-value .iconfont {
                    font-size: 20px;
                    margin-right: 5px;
                    color: color.adjust($theme-secondary, $lightness: 0%);
                }

                .arrow-icon .iconfont {
                    color: color.adjust($theme-secondary, $lightness: -10%);
                    transition: color 0.3s ease;
                }
            }

            &:hover .arrow-icon .iconfont {
                color: $theme-primary;
            }
        }

    }

    .panel-bottom {
        width: 100%;
        border-radius: $border-radius;
        background: linear-gradient(135deg, color.adjust($color-light, $lightness: -2%) 0%, color.adjust($color-light, $lightness: -5%) 100%);

        .modes {
            width: 100%;

            .modes-wrapper {
                border-radius: 0px 0px 6px 6px;
                padding: 10px 15px;
                display: flex;
                gap: 10px;
                border: 1px solid color.adjust($theme-secondary, $lightness: 15%, $alpha: -0.3);
                background: linear-gradient(135deg, $color-light 0%, color.adjust($theme-secondary, $lightness: 40%, $alpha: -0.9) 100%);
                box-shadow: inset 0 1px 3px rgba(218, 112, 214, 0.1);
            }

            button {
                flex: 1;
                padding: 10px 15px;
                border: 1px solid color.adjust($theme-primary, $lightness: 15%, $alpha: -0.3);
                border-radius: $border-radius;
                background: linear-gradient(135deg, $color-light 0%, color.adjust($theme-primary, $lightness: 40%, $alpha: -0.9) 100%);
                color: color.adjust($theme-secondary, $lightness: 0%);
                font-weight: 500;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
                box-shadow: $shadow-sm;

                &:hover {
                    background: linear-gradient(135deg, $theme-primary 0%, color.adjust($theme-primary, $lightness: -10%) 100%);
                    color: $color-light;
                    border-color: color.adjust($theme-primary, $lightness: -15%);
                    box-shadow: $shadow-md;
                    transform: translateY(-1px);
                }

                &:active {
                    transform: translateY(0);
                    box-shadow: $shadow-sm;
                }
            }
        }
    }

}
</style>