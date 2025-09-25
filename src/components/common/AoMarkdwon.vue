<template>
    <div class="markdown-body" v-html="parsedMarkdown" ref="markdownContainer">
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { marked } from 'marked'
import 'juejin-markdown-themes/dist/cyanosis.min.css'

const props = defineProps({
    markdownData: {
        type: String,
        default: ''
    },
    markdownFile: {
        type: String,
        default: ''
    },
    autoScrollCode: {
        type: Boolean,
        default: true
    }
})

const fileContent = ref('')
const markdownContainer = ref(null)

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

// 自动滚动代码块到底部
const scrollCodeBlocksToBottom = () => {
    if (!markdownContainer.value || !props.autoScrollCode) return

    nextTick(() => {
        const codeBlocks = markdownContainer.value.querySelectorAll('pre code')
        codeBlocks.forEach(codeBlock => {
            const preElement = codeBlock.closest('pre')
            if (preElement) {
                // 检查是否有滚动条
                if (preElement.scrollHeight > preElement.clientHeight) {
                    preElement.scrollTop = preElement.scrollHeight
                }
            }
        })
    })
}

// 监听markdown内容变化，自动滚动
watch(markdownContent, () => {
    scrollCodeBlocksToBottom()
}, { flush: 'post' })

// 使用 MutationObserver 监听DOM变化（适用于流式数据更新）
let observer = null

const setupMutationObserver = () => {
    if (!markdownContainer.value) return

    // 如果已存在observer，先断开
    if (observer) {
        observer.disconnect()
    }

    observer = new MutationObserver((mutations) => {
        let shouldScroll = false

        mutations.forEach(mutation => {
            // 检查是否有代码块相关的变化
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                // 检查变化的节点是否包含代码块
                const hasCodeChanges = Array.from(mutation.addedNodes).some(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        return node.querySelector('pre code') || node.closest('pre code')
                    }
                    return false
                }) || Array.from(mutation.target.querySelectorAll ? mutation.target.querySelectorAll('pre code') : []).length > 0

                if (hasCodeChanges) {
                    shouldScroll = true
                }
            }
        })

        if (shouldScroll) {
            scrollCodeBlocksToBottom()
        }
    })

    // 开始观察
    observer.observe(markdownContainer.value, {
        childList: true,
        subtree: true,
        characterData: true
    })
}

onMounted(() => {
    console.log(props.markdownFile)
    setupMutationObserver()
    scrollCodeBlocksToBottom()
})

// 组件卸载时清理observer
onUnmounted(() => {
    if (observer) {
        observer.disconnect()
    }
})

// 暴露手动滚动方法
defineExpose({
    scrollCodeBlocksToBottom
})
</script>

<style lang="scss">
// @use '@/assets/styles/common/_markdown.scss' as *;
.markdown-body {
    @include c-t {
        background-color: none;
    }


    pre {
        position: relative;
        max-height: 600px;
        overflow-y: auto;

        // 优化滚动条样式
        &::-webkit-scrollbar {
            width: 8px;
        }

        &::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 4px;

            &:hover {
                background: rgba(0, 0, 0, 0.5);
            }
        }

        // 平滑滚动
        scroll-behavior: smooth;
    }


}
</style>