<template>
    <div class="user-sidebar">
        <div class="sidebar-wrapper">
            <div class="sidebar-nav-group" v-for="(item, index) in navGroups" :key="index">
                <div class="nav-label">
                    <div class="label-icon"><i :class="['iconfont', item.icon]"></i></div>
                    <div class="label-value">{{ item.label }}</div>
                </div>
                <div class="sidebar-nav">
                    <ul>
                        <li v-for="(navItem, index) in item.items" :key="index">
                            <router-link :to="navItem.route">
                                <i :class="['iconfont', navItem.icon]"></i>
                                {{ navItem.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const navGroups = ref([
    {
        icon: 'icon-file-keynote',
        label: '应用',
        items: [
            {
                icon: 'icon-cloud-download',
                name: '下载记录',
                route: '/user/dl'
            },
            {
                icon: 'icon-rmb',
                name: '充值记录',
                route: '/user/recharge'
            },
            {
                icon: 'icon-collection',
                name: '应用收藏',
                route: '/user/collect/app'
            },
            {
                icon: 'icon-cloud-upload',
                name: '投稿历史',
                route: '/user/upload'
            }
        ]
    },
    {
        icon: 'icon-shouye-wifi',
        label: '社区',
        items: [
            {
                icon: 'icon-details',
                name: '我的帖子',
                route: '/user/post'
            },
            {
                icon: 'icon-xihuan',
                name: '我的粉丝',
                route: '/user/fans'
            },
            {
                icon: 'icon-plus',
                name: '我的关注',
                route: '/user/follow'
            },
            {
                icon: 'icon-shoucang',
                name: '帖子收藏',
                route: '/user/collect/post'
            }
        ]
    },
    {
        icon: 'icon-yonghu',
        label: '账号',
        items: [
            {
                icon: 'icon-lightning',
                name: '账号安全',
                route: '/user/security'
            },
            {
                icon: 'icon-dengji',
                name: '修改资料',
                route: '/user/edit'
            },
            {
                icon: 'icon-delete',
                name: '注销账号',
                route: '/user/delete'
            }
        ]
    }
])
</script>
<style lang="scss" scoped>
@use '@/assets/styles/user/_user-sidebar.scss' as *;
</style>