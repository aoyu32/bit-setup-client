<template>
    <div class="ao-markdown" v-html="parseMarkdownData">
    </div>
</template>
<script setup>
import { ref,computed } from 'vue'
import { marked } from 'marked';
const props = defineProps({
    markdownData: {
        type: String,
        default: ''
    },
})

const parseMarkdownData = computed(()=>{
    return marked.parse(props.markdownData)
})
</script>
<style lang="scss">
@use '@/assets/styles/common/_markdown.scss' as *;
</style>
