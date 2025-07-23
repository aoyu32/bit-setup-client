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
@use '@/assets/styles/home/_control-panel.scss' as *;
</style>