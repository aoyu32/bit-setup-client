<template>
    <div class="header">
        <div class="header-container">
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
            <div class="search">
                <HeaderSearch />
            </div>
            <div class="search-trigger">
                <div class="search-icon">
                    <i class="iconfont icon-search"></i>
                </div>
            </div>
            <div class="profile">
                <div class="profile-container">
                    <div class="coin">
                        <span>{{ myCoin }}</span>
                        <div class="coin-icon">
                            <img :src="coinIcon" alt="">
                        </div>
                    </div>
                    <div class="vip" v-if="isMember">
                        <img :src="vipImgUrl" alt="">
                    </div>
                    <div class="user-info" @click="showMenu = !showMenu">
                        <div class="avatar">
                            <img :src="avatarUrl || defaultAvatar" alt="用户头像">
                        </div>
                        <span class="username">{{ username }}</span>
                        <div class="user-menu" v-if="isShowProfileMenu">
                            <ul>
                                <li><i class="iconfont icon-user"></i>个人中心</li>
                                <li><i class="iconfont icon-settings"></i>设置</li>
                                <li><i class="iconfont icon-logout"></i>退出登录</li>
                            </ul>
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
import HeaderSearch from './HeaderSearch.vue'

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
        route: '/assistant'
    },
    {
        icon: 'icon-shouye-wifi',
        name: '社区',
        route: '/community'
    }
])

const myCoin = ref(100)
const isMember = ref(true)
const username = ref('aoyufdsffdsfsd')
const avatarUrl = ref('https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Felix')
const isShowProfileMenu = ref(false)
const isShowDropDownNav = ref(false)


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