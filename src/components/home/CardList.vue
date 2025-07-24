<template>
    <div class="card-list">
        <div class="card-header">
            <div class="header-content">
                <h3 class="card-title">{{ cardApp.label }}</h3>
                <div class="title-underline"></div>
            </div>
            <div class="item-badge">{{ cardApp.appList.length }}</div>
        </div>
        <div class="card-content" ref="scrollContainer">
            <div 
                class="list-item" 
                v-for="(item, index) in cardApp.appList" 
                :key="index"
                @click="handleItemClick(item)"
            >
                <div class="item-left">
                    <div class="item-avatar">
                        <img :src="item.img" :alt="item.name" />
                        <div class="avatar-ring"></div>
                    </div>
                    <div class="item-content">
                        <div class="item-title">{{ item.name }}</div>
                        <div class="item-subtitle">{{ item.bio }}</div>
                    </div>
                </div>
                <div class="item-right">
                    <div class="item-arrow">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps(['cardApp'])
const scrollContainer = ref(null)

const handleItemClick = (item) => {
    console.log('点击了应用:', item.name);
}

onMounted(() => {
    console.log(props.cardApp);
    console.log(props.cardApp.appList);
    
    // 确保滚动对齐到完整项目
    if (scrollContainer.value) {
        const itemHeight = 72; // 每个项目的固定高度
        scrollContainer.value.addEventListener('scroll', () => {
            const scrollTop = scrollContainer.value.scrollTop;
            const remainder = scrollTop % itemHeight;
            if (remainder !== 0 && remainder < itemHeight / 2) {
                scrollContainer.value.scrollTo({
                    top: scrollTop - remainder,
                    behavior: 'smooth'
                });
            } else if (remainder > itemHeight / 2) {
                scrollContainer.value.scrollTo({
                    top: scrollTop + (itemHeight - remainder),
                    behavior: 'smooth'
                });
            }
        });
    }
})
</script>

<style lang="scss" scoped>
 @use '@/assets/styles/home/_card-list.scss' as *;
</style>