<template>
    <router-view></router-view>
    <div class="control-panel-wrapper" v-if="isShowControlPanel">
        <div class="control-panel-container">
            <ControlPanel />
        </div>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import ControlPanel from '@/components/home/ControlPanel.vue';

const isShowControlPanel = ref(false)
onMounted(() => {
    getTheme()
    window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
})

const handleKeyDown = (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'x') {
        e.preventDefault()
        isShowControlPanel.value = !isShowControlPanel.value
    }
}


const getTheme = () => {
    const localTheme = localStorage.getItem('th')
    let setTheme = 'light'
    if (localTheme) {
        setTheme = localTheme
    }
    document.documentElement.setAttribute('data-theme', setTheme)
}
</script>
<style scoped lang="scss">
.control-panel-wrapper {
    @include wh;
    position: fixed;
    @include flex(c, c);
    background-color: color(c-g9, 0.9);
    top: 0;
    bottom: 0;
}

.control-panel-container {
    @include wh(400px, n);
}
</style>
