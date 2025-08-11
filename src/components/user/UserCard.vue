<template>
    <div class="user-card">
        <div class="card-folded" v-if="isFold">
            <div class="card-left">
                <div class="avatar">
                    <div class="img-wrapper">
                        <img src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=TechExplorer" alt="">
                    </div>
                </div>
                <div class="name-vip">
                    <div class="nickname">
                        <span>我是aoyu呀</span>
                    </div>
                    <div class="vip">
                        <div class="vip-img">
                            <img src="../../assets/imgs/vip.svg" alt="">
                        </div>
                        <span>未开通</span>
                    </div>
                </div>
            </div>
            <div class="card-right">
                <div class="fold-logout">
                    <button class="fold" @click="isFold = !isFold">
                        <span>展开</span>
                        <span><i class="iconfont icon-xiangxia-2"></i></span>
                    </button>
                    <button class="logout">
                        <span>退出登录</span>
                        <span><i class="iconfont icon-tuichu"></i></span>
                    </button>

                </div>
            </div>
        </div>
        <div class="card-unfold" v-else>
            <div class="card-top">
                <div class="avatar">
                    <div class="img-wrapper">
                        <img src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=TechExplorer" alt="">
                    </div>
                </div>
                <div class="base-info">
                    <div class="name-vip">
                        <div class="nickname">
                            <span>我是aoyu呀</span>
                        </div>
                        <div class="vip">
                            <div class="vip-img">
                                <img src="../../assets/imgs/vip.svg" alt="">
                            </div>
                            <span>未开通</span>
                        </div>
                    </div>
                    <div class="level-progress">
                        <div class="level">
                            <span>无敌新手</span>
                            <span>lv0</span>
                        </div>
                        <div class="progress">
                            <div class="progress-container">
                                <AoProgress />
                            </div>
                            <div class="exp">
                                <div class="current-exp">
                                    <span>当前经验值：34</span>
                                </div>
                                <div class="short-exp">
                                    <span>距离下一级：66</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bio">
                        <div class="bio-wrapper">
                            <p>这个用户很懒，没有任何简介！</p>
                        </div>
                    </div>
                </div>
                <div class="other-info">
                    <div class="other-info-group">
                        <div class="other-info-item">
                            <div class="item-label">
                                <span><i class="iconfont icon-xingbie4"></i></span>
                                <span>性别</span>
                            </div>
                            <div class="item-value">
                                <span><i class="iconfont icon-woman"></i></span>
                                <!-- <span><i class="iconfont icon-man"></i></span> -->
                                <span>女</span>
                            </div>
                        </div>
                        <div class="other-info-item">
                            <div class="item-label">
                                <span><i class="iconfont icon-didian"></i></span>
                                <span>IP属地</span>
                            </div>
                            <div class="item-value">
                                <!-- <span><i class="iconfont icon-woman"></i></span> -->
                                <!-- <span><i class="iconfont icon-man"></i></span> -->
                                <span>安徽阜阳</span>
                            </div>
                        </div>
                    </div>
                    <div class="other-info-group">
                        <div class="other-info-item">
                            <div class="item-label">
                                <span><i class="iconfont icon-zhiye"></i></span>
                                <span>职业</span>
                            </div>
                            <div class="item-value">
                                <span>程序员</span>
                            </div>
                        </div>
                        <div class="other-info-item">
                            <div class="item-label">
                                <span><i class="iconfont icon-time"></i></span>
                                <span>注册时间</span>
                            </div>
                            <div class="item-value">
                                <span>2025-08-07</span>
                            </div>
                        </div>
                    </div>
                    <div class="other-info-group">
                        <div class="other-info-item">
                            <div class="item-label">
                                <span><i class="iconfont icon-yuanmachakan"></i></span>
                                <span>开发者认证</span>
                            </div>
                            <div class="item-value">
                                <span>未认证</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="fold-logout">
                    <button class="fold" @click="isFold = true">
                        <span>折叠</span>
                        <span><i class="iconfont icon-xiangshang-2"></i></span>
                    </button>
                    <button class="logout">
                        <span>退出登录</span>
                        <span><i class="iconfont icon-tuichu"></i></span>
                    </button>

                </div>
            </div>
            <div class="card-bottom">
                <div class="stats">
                    <div class="stats-item" v-for="(item, index) in userStats" :key="index">
                        <span><i :class="['iconfont', item.icon]"></i></span>
                        <span>{{ item.name }}</span>
                        <span>{{ item.value }}</span>
                    </div>
                </div>
                <div class="user-id">
                    <span>用户ID</span>
                    <span>100434325435</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoProgress from '../common/AoProgress.vue';
const isFold = ref(false)
const userStats = ref([
    {
        icon: 'icon-details',
        name: '帖子',
        value: 36
    },
    {
        icon: 'icon-yuedu1',
        name: '浏览',
        value: 128
    },
    {
        icon: 'icon-like',
        name: '获赞',
        value: 42
    },
    {
        icon: 'icon-pinglun',
        name: '评论',
        value: 128
    },
    {
        icon: 'icon-plus',
        name: '关注',
        value: 89
    },
    {
        icon: 'icon-xihuan',
        name: '粉丝',
        value: 1024
    }
])

</script>
<style scoped lang="scss">
@use '@/assets/styles/user/_user-card.scss' as *;
</style>