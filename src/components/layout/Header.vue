<template>
    <div class="header">
        <div class="header-container" :style="{ justifyContent: isSearchPage ? 'space-between' : 'none' }">
            <div class="nav">
                <div class="nav-container">
                    <ul>
                        <li @click="activeNavItem(0)">
                            <router-link :to="navItems[0].route">
                                <img :src="navItems[0].icon" alt="">
                                {{ navItems[0].name }}
                            </router-link>
                        </li>
                        <li v-for="(item, index) in navItems.slice(1)" :key="index" class="nav-item"
                            @click="activeNavItem(index + 1)">
                            <router-link :to="item.route" :class="{ active: activeNavIndex === index + 1 }">
                                <i :class="['iconfont', item.icon]"></i>
                                {{ item.name }}
                            </router-link>
                        </li>
                    </ul>
                    <a class="trigger" @click.prevent="isShowDropDownNav = !isShowDropDownNav">
                        <i class="iconfont icon-move"></i>
                    </a>
                    <ul class="nav-drop-down" v-if="isShowDropDownNav">
                        <li v-for="(item, index) in navItems.slice(1)" :key="index" @click="activeNavItem(index + 1)">
                            <router-link :to="item.route" :class="{ active: activeNavIndex === index + 1 }">
                                <i :class="['iconfont', item.icon]"></i>
                                {{ item.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="search" v-if="!isSearchPage">
                <!-- <HeaderSearch /> -->
                <AoSearch :suggestion="mockSuggestions" :history="searchHistory" v-model="searchValue"
                    @clear="searchValue = ''" @search="handleSearch"></AoSearch>
            </div>
            <div class="search-trigger" v-if="!isSearchPage">
                <div class="search-icon">
                    <i class="iconfont icon-search"></i>
                </div>
            </div>
            <div class="profile">
                <div class="profile-container">
                    <div class="profile-left">
                        <router-link to="/recharge">
                            <div class="coin">
                                <span>{{ myCoin }}</span>
                                <div class="coin-icon">
                                    <img :src="coinIcon" alt="">
                                </div>
                            </div>
                        </router-link>
                        <router-link to="/vip">
                            <div class="vip" v-if="isMember">
                                <img :src="vipImgUrl" alt="">
                            </div>
                        </router-link>
                        <router-link to='/message'>
                            <div class="message">
                                <i class="iconfont icon-xiaoxi"></i>
                            </div>
                        </router-link>
                    </div>
                    <div class="user-info" :style="{ marginTop: userInfoMarginTop }" v-show="isLogin">
                        <div class="user-info-wrapper">
                            <div class="avatar">
                                <img :src="avatarUrl || defaultAvatar" alt="用户头像">
                            </div>
                            <div class="username">
                                <span>{{ username }}</span>
                            </div>
                        </div>
                        <div class="user-menu">
                            <ul>
                                <router-link to="/user">
                                    <li><i class="iconfont icon-user"></i><span>个人中心</span></li>
                                </router-link>
                                <li @click="isLogin = false"><i class="iconfont icon-tuichu"></i><span>退出登录</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="user-login-reg" v-show="!isLogin">
                        <div class="login">
                            <router-link to="/login">登录</router-link>
                        </div>
                        <div class="register">
                            <router-link to="/register">注册</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import logoUrl from '@/assets/logo.svg'
import vipImgUrl from '@/assets/imgs/vip.svg'
import coinIcon from '@/assets/imgs/coin.svg'
import HeaderSearch from '@/components/layout/HeaderSearch.vue'
import AoSearch from '@/components/common/AoSearch.vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const searchValue = ref('')
const isLogin = ref(true)

const userInfoMarginTop = ref('')
onMounted(() => {
    const profileHeight = document.querySelector('.profile-container').offsetHeight
    const userInfoHeight = document.querySelector('.user-info-wrapper').offsetHeight
    userInfoMarginTop.value = `${(profileHeight - userInfoHeight) / 2}px`
})
//头部导航项
const navItems = ref([
    {
        icon: logoUrl,
        name: '比特聚合',
        route: '/'
    },
    {
        icon: 'icon-fenlei',
        name: '分类',
        route: '/category'
    },
    {
        icon: 'icon-pintu',
        name: '套件',
        route: '/suite'
    },
    {
        icon: 'icon-shejizhinengzhushou',
        name: '智能AI',
        route: '/ai'
    },
    {
        icon: 'icon-shouye-wifi',
        name: '社区',
        route: '/community'
    }
])

const isSearchPage = computed(() => {
    return route.path === '/search'
})

// 模拟搜索建议数据
const mockSuggestions = [
    'Vue3',
    'Vue3 教程',
    'Vue3 组件',
    'Vue3 源码',
    'Vue3 实战',
    'Vue3 组合式API',
    'Vue3 响应式原理'
]

const searchHistory = ref([
    "vue3",
    "react hooks最佳实践",
    "如何学习TypeScript",
    "js",
    "2023前端发展趋势",
    "css动画效果",
    "node.js性能优化",
    "webpack配置",
    "es6新特性",
    "前端面试题",
    "python",
    "机器学习入门",
    "rust vs go",
    "docker部署前端项目",
    "git高级用法",
    "如何提高代码质量",
    "前端性能优化技巧",
    "小程序开发",
    "nuxt.js服务端渲染",
    "大前端技术栈",
    "算法",

])

const myCoin = ref(100)
const isMember = ref(true)
const username = ref('aoyufdsffdsfsd')
const avatarUrl = ref('https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Felix')
const isShowProfileMenu = ref(false)
const isShowDropDownNav = ref(false)

const handleSearch = () => {
    console.log(searchValue.value);

    const route = router.resolve({
        path: '/search',
        query: {
            all: searchValue.value
        }
    })
    window.open(route.href, '_blank')
}



const activeNavIndex = ref(0);

const activeNavItem = (index) => {
    activeNavIndex.value = index;

    if (window.innerWidth <= 1265) {
        isShowDropDownNav.value = false;
    }
};

</script>
<style scoped lang="scss">
@use "@/assets/styles/layout/_header.scss" as *;
</style>