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
                <div class="themes-selector">
                    <AoSelector :options="themeOptions" v-model="selectTheme">
                        <template #left-icon>
                            <span class="left-icon"><i class="iconfont icon-tiaosepan"></i></span>
                        </template>
                    </AoSelector>
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
import { ref, onMounted, computed, watch } from 'vue'
import AoSelector from '@/components/common/AoSelector.vue';
const themeOptions = ref([
    {
        label: "极简至白",
        value: "light"
    },
    {
        label: "深邃黑夜",
        value: "dark"
    },
    {
        label: "红色燎原",
        value: "flame"
    },
    {
        label: "繁星之夜",
        value: "cosmos"
    },
    {
        label: "绿意盎然",
        value: "forest"
    },
    {
        label: "冷酷之蓝",
        value: "ocean"
    }
]);
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
        name: '应用投稿',
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
onMounted(() => {
    // currentTheme.value = 'dark'
    // handleChangeTheme()
})
const selectTheme = ref('')

watch(() => selectTheme.value, (newValue) => {
    document.documentElement.setAttribute('data-theme', newValue)
    localStorage.setItem('th', newValue)
})

</script>
<style scoped lang="scss">
@use '@/assets/styles/home/_control-panel.scss' as *;
</style>