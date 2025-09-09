<template>
    <router-view></router-view>
</template>
<script setup>
import { onMounted } from 'vue'
onMounted(() => {
    getTheme()
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
