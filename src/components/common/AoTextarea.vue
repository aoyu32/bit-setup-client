<template>
    <div class="ao-textarea">
        <textarea name="" id="" placeholder="请输入帖子摘要" ref="textareaRef" @input="adjustTextareaHeight"></textarea>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const textareaRef = ref(null)
const adjustTextareaHeight = () => {
    const textarea = textareaRef.value
    textarea.style.height = 'auto' // 先重置高度
    textarea.style.height = `${textarea.scrollHeight}px` // 再设置为内容高度
}

onMounted(() => {
    adjustTextareaHeight() // 初始化时执行一次
})
</script>
<style lang="scss" scoped>
.ao-textarea {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;

    textarea {
        // 基础样式
        width: 100%;
        height: 100%;
        padding: 15px;
        max-height: 200px;
        font-size: 14px;
        line-height: 1.6;
        color: #333;
        border-radius: 8px;
        background-color: #fff;
        border: 1px solid #e0e0e0;

        outline: none;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        resize: none;


        letter-spacing: 0.2px;

        // 占位符样式
        &::placeholder {
            color: #999;
            opacity: 1;
        }

        /* 聚焦状态 */
        &:focus {
            border-color: #4d90fe;
        }

    }
}
</style>