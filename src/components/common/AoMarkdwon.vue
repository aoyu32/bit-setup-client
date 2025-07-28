<template>
    <div class="ao-markdown" v-html="markdownData">
    </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
    markdownData: {
        type: String,
        default: ''
    },
})
</script>
<style lang="scss">
@use '@/assets/styles/common/_markdown.scss' as *;
</style>
