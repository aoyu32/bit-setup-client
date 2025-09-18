<template>
    <div class="card-list">
        <div class="card-header" :class="color">
            <div class="header-content">
                <div class="card-icon"><i :class="['iconfont', icon]" :style="{ color: icon.color }"></i></div>
                <h3 class="card-title">{{ title }}</h3>
                <div class="title-underline"></div>
            </div>
            <div class="item-badge">TOP {{ data.length }}</div>
        </div>
        <div class="card-content" :class="bg" ref="scrollContainer">
            <div class="list" v-if="data">
                <div class="list-item" v-for="app in data" :key="app.id" @click="handleItemClick(app.id)">
                    <div class="item-left">
                        <div class="item-avatar">
                            <img :src="app.iconUrl" :alt="app.appName" />
                            <div class="avatar-ring"></div>
                        </div>
                        <div class="item-content">
                            <div class="item-title">{{ app.appName }}</div>
                            <div class="item-subtitle">{{ app.brief }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="empty" v-else>
                <p>暂无应用</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    data: {
        type: Array,
        default: []
    },
    icon: {
        type: String,
        default: 'icon-asset-monitor'
    },
    title: {
        type: String,
        default: '标题'
    },
    color: {
        type: String,
        default: 'color1'
    },
    bg: {
        type: String,
        default: 'a'
    }

})


const scrollContainer = ref(null)
const router = useRouter()

const handleItemClick = (id) => {
    const routeData = router.resolve(`/detail/${id}`)
    window.open(routeData.href, '_blank')
}

onMounted(() => {
    // 确保滚动对齐到完整项目
    if (scrollContainer.value) {
        const itemHeight = 82; // 每个项目的固定高度
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