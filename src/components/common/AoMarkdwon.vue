<template>
    <div class="ao-markdown" v-html="parsedMarkdown">
    </div>
</template>

<script setup>
import { ref, computed, watch,onMounted } from 'vue'
import { marked } from 'marked'
import 'juejin-markdown-themes/dist/z-blue.min.css'

const props = defineProps({
    markdownData: {
        type: String,
        default: ''
    },
    markdownFile: {
        type: String,
        default: ''
    }
})

const fileContent = ref('')

const loadMarkdownFile = async (url) => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Failed to fetch markdown file: ${response.status}`)
        }
        fileContent.value = await response.text()
    } catch (error) {
        console.error('Error loading markdown file:', error)
        fileContent.value = `# Error loading markdown\n${error.message}`
    }
}

watch(() => props.markdownFile, (newVal) => {
    if (newVal) {
        loadMarkdownFile(newVal)
    }
}, { immediate: true })

const markdownContent = computed(() => {
    return fileContent.value || props.markdownData
})

const parsedMarkdown = computed(() => {
    return marked.parse(markdownContent.value)
})

onMounted(()=>{
    console.log(props.markdownFile);
    
})
</script>

<style lang="scss">
@use '@/assets/styles/common/_markdown.scss' as *;
// .markdown-body{
//     padding: 20px 0;
// }
</style>