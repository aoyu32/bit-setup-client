<template>
    <div class="user-card">
        <div class="card-folded" v-if="isFold">
            <div class="card-left">
                <div class="avatar">
                    <div class="img-wrapper">
                        <img :src="userInfoData.avatar || defaultAvatar" alt="头像">
                    </div>
                </div>
                <div class="name-vip">
                    <div class="nickname">
                        <span>{{ userInfoData.nickname || '未设置昵称' }}</span>
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
                        <img :src="userInfoData.avatar || defaultAvatar" alt="头像">
                    </div>
                </div>
                <div class="base-info">
                    <div class="name-vip">
                        <div class="nickname">
                            <span>{{ authStore.isLogin ? userInfoData.nickname : '未登录' }}</span>
                        </div>
                        <div class="vip">
                            <div class="vip-img">
                                <img src="../../assets/imgs/vip.svg" alt="">
                            </div>
                            <span :class="{ gold: isVipUser }">{{ isVipUser ? '至尊年度会员' : '未开通' }}</span>
                        </div>
                    </div>
                    <div class="level-progress">
                        <div class="level">
                            <span>{{ userInfoData.levelTitle || '无敌新手' }}</span>
                            <span>lv{{ userInfoData.level || 0 }}</span>
                        </div>
                        <div class="progress">
                            <div class="progress-container">
                                <AoProgress :current="userInfoData.experience || 0" :total="100" :show-text="false"
                                    :animate="true" size="small" />
                            </div>
                            <div class="exp">
                                <div class="current-exp">
                                    <span>当前经验值：{{ userInfoData.experience || 0 }}</span>
                                </div>
                                <div class="short-exp">
                                    <span>距离下一级：{{ nextLevelExp }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bio">
                        <div class="bio-wrapper">
                            <p>{{ userInfoData.bio || '这个用户很懒，没有任何简介！' }}</p>
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
                                <span>
                                    <i :class="['iconfont', genderIcon]"></i>
                                </span>
                                <span>{{ genderText }}</span>
                            </div>
                        </div>
                        <div class="other-info-item">
                            <div class="item-label">
                                <span><i class="iconfont icon-didian"></i></span>
                                <span>城市</span>
                            </div>
                            <div class="item-value">
                                <span>{{ locationText }}</span>
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
                                <span>{{ userInfoData.career || '未设置' }}</span>
                            </div>
                        </div>
                        <div class="other-info-item">
                            <div class="item-label">
                                <span><i class="iconfont icon-time"></i></span>
                                <span>注册时间</span>
                            </div>
                            <div class="item-value">
                                <span>{{ formatDateOnly(userInfoData.registerTime) || '未知' }}</span>
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
                                <span>{{ userInfoData.isDeveloper ? '已认证' : '未认证' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fold-logout">
                    <button class="fold" @click="isFold = true">
                        <span>折叠</span>
                        <span><i class="iconfont icon-xiangshang-2"></i></span>
                    </button>
                    <button class="logout" @click="showDialog = true">
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
                    <span>{{ userInfoData.uid || '未知' }}</span>
                </div>
            </div>
        </div>
        <AoDialog v-model="showDialog" title="退出登录" size="medium" @confirm="handleConfirm">
            <p>{{ dialogContent }}</p>
        </AoDialog>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import AoProgress from '../common/AoProgress.vue';
import { useUserInfoStore } from '../../stores/user';
import { useAuthStore } from '../../stores/auth';
import { formatDateOnly } from '../../utils/date';
import AoDialog from '../common/AoDialog.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const userStore = useUserInfoStore()
const authStore = useAuthStore()
const isFold = ref(false)
const defaultAvatar = 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=TechExplorer'

const showDialog = ref(false)
const dialogContent = ref("确定退出登录吗？")
const handleConfirm = () => {
    authStore.logout()
    router.resolve("/home")
}
// 使用 computed 确保响应式
const userInfoData = computed(() => userStore.userData)

// 计算属性来处理数据
const genderText = computed(() => {
    const genderMap = { 2: '未知', 1: '男', 0: '女' }
    return genderMap[userInfoData.value.gender] || '未知'
})

const genderIcon = computed(() => {
    const iconMap = { 1: 'icon-man', 0: 'icon-woman' }
    return iconMap[userInfoData.value.gender] || ''
})

const locationText = computed(() => {
    const { province, city, county } = userInfoData.value
    if (!province && !city && !county) return '未知'
    return province + city
})

const nextLevelExp = computed(() => {
    const currentExp = userInfoData.value.experience || 0
    // 假设每级需要100经验，可以根据实际需求调整
    return Math.max(0, 100 - (currentExp % 100))
})

const isVipUser = computed(() => {
    return userInfoData.value.role === 'vip'
})

// 动态统计数据
const userStats = computed(() => [
    {
        icon: 'icon-details',
        name: '帖子',
        value: userInfoData.value.postCount || 0
    },
    {
        icon: 'icon-yuedu1',
        name: '浏览',
        value: userInfoData.value.viewCount || 0
    },
    {
        icon: 'icon-like',
        name: '获赞',
        value: userInfoData.value.likeCount || 0
    },
    {
        icon: 'icon-pinglun',
        name: '评论',
        value: userInfoData.value.commentCount || 0
    },
    {
        icon: 'icon-plus',
        name: '关注',
        value: userInfoData.value.followCount || 0
    },
    {
        icon: 'icon-xihuan',
        name: '粉丝',
        value: userInfoData.value.fansCount || 0
    }
])

// 组件挂载时获取数据
onMounted(async () => {
    await userStore.fetchBaseInfo()
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/user/_user-card.scss' as *;
</style>