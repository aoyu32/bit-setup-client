<template>
    <div class="app-list">
        <div class="list-wrapper">
            <AppCard v-for="app in list" :key="app.id" :app="app" />
        </div>
        <div class="load-more" ref="loadMoreRef">
            <AoLoadding :showDots="true" font-size="20px" :intensity="0" v-if="loading" />
            <div class="no-more" v-else-if="noMoreData">
                <p>没有更多了</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AppCard from './AppCard.vue';
import AoLoadding from '../../components/common/AoLoadding.vue';

const props = defineProps({
    list: {
        type: Array,
        default: []
    }
})

const emit = defineEmits(['loadMore'])

const loadMoreRef = ref(null)
const loading = ref(false)
const noMoreData = ref(false)
let observer = null

// 设置加载状态
const setLoading = (state) => {
    loading.value = state
}

// 设置无更多数据状态
const setNoMoreData = (state) => {
    noMoreData.value = state
}

// 创建 Intersection Observer
const createObserver = () => {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !loading.value && !noMoreData.value) {
                loading.value = true
                emit('loadMore')
            }
        })
    }, {
        threshold: 0.1
    })

    if (loadMoreRef.value) {
        observer.observe(loadMoreRef.value)
    }
}

onMounted(() => {
    createObserver()
})

onUnmounted(() => {
    if (observer) {
        observer.disconnect()
    }
})

// 暴露方法给父组件调用
defineExpose({
    setLoading,
    setNoMoreData
})
</script>
<style lang="scss" scoped>
.app-list {
    @include wh;
    @include flex(c, c, c);
    gap: 50px;
}
.list-wrapper {
    @include wh;
    @include grid(auto-fill, minmax(200px, 1fr), 70px);
}
.load-more {
    @include wh;
    margin-bottom: 30px;
    @include flex(c, c, c);
}
@media (max-width:768px) {
    .list-wrapper {
        @include grid(auto-fill, minmax(210px, 1fr))
    }
}
</style>