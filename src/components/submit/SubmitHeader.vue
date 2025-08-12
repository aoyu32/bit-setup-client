<template>
    <div class="submit-header">
        <div class="header-left">
            <div class="submit-item" v-for="(item, index) in submitItems" :key="index"
                :class="{ active: currentActive === index }">
                <router-link :to="item.route" @click="currentActive = index">
                    <span><i :class="['iconfont', item.icon]"></i></span>
                    <span>{{ item.name }}</span>
                </router-link>
            </div>
        </div>
        <div class="header-right">
            <div class="slogan">
                {{ submitItemSlogan }}
            </div>
            <div class="check-out-history">
                <router-link :to="submitItemHistory.route">
                    {{ submitItemHistory.label }}
                </router-link>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
const currentActive = ref(0)
const submitItems = ref([
    {
        icon: 'icon-liwu',
        name: '应用推荐',
        route: '/submit/recommend'
    },
    {
        icon: 'icon-zhongduan',
        name: '个人开发',
        route: '/submit/developer'

    }
])
const route = useRoute()
const submitItemHistory = ref(null)
const submitItemSlogan = computed(() => {
    if (route.path === '/submit/recommend') {
        submitItemHistory.value = {
            label: '应用推荐记录',
            route: '/user/submit'
        }
        return '分享您发现的宝藏应用，让好产品发光'
    }
    if (route.path === '/submit/developer') {
        submitItemHistory.value = {
            label: '个人应用投稿记录',
            route: '/user/submit'
        }
        return '每一个天才创意，都值得被世界下载'
    }
})

</script>
<style scoped lang="scss">
@use '@/assets/styles/submit/_submit-header.scss' as *;
</style>