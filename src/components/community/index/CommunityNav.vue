<template>
    <div class="community-nav">
        <div class="nav-wrapper">
            <div class="nav-item" v-for="(item, index) in navList" :key="index" :class="{ active: index === currentIndex }"
                @click="handleNavItem(index)">{{ item }}</div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const navList = ref([
    '全部',
    '话题',
    '求助',
    '教程'
])

const currentIndex = ref(0)
const handleNavItem = (index) => {
    currentIndex.value = index
}

</script>
<style lang="scss" scoped>
@use '@/assets/styles/community/index/_community-nav.scss' as *;
</style>