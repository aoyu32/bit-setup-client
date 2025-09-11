<template>
    <router-view></router-view>
</template>
<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
onMounted(() => {
    getTheme()
    if (route.path === '/vip') {
      
    }
})

const getTheme = () => {
    const localTheme = localStorage.getItem('th')
    let setTheme = 'light'
    if (localTheme) {
        setTheme = localTheme
    }
    document.documentElement.setAttribute('data-theme', setTheme)
}
</script>
<style scoped></style>
