<template>
    <div class="community-nav">
        <div class="nav-wrapper">
            <div class="nav-item" v-for="(item, index) in navList" :key="index"
                :class="{ active: index === currentIndex }" @click="handleNavItem(index)">
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// 定义导航列表，包含 label 和 value
const navList = ref([
    { label: '全部', value: 'all' },
    { label: '话题', value: 'topic' },
    { label: '求助', value: 'help' },
    { label: '教程', value: 'course' },
    { label: '文章', value: 'article' }
])

const currentIndex = ref(0)
const emit = defineEmits(['active-item'])

const handleNavItem = (index) => {
    currentIndex.value = index
    // 发射对应的 value 值而不是 label
    emit('active-item', navList.value[index].value)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/community/index/_community-nav.scss' as *;
</style>