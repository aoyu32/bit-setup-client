<!-- Message.vue -->
<template>
    <div class="ao-message">
        <div class="message-tip" :class="messageClass" ref="messageTip">
            <div class="message-container" :class="typeClass">
                <p>{{ messageText }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const messageTip = ref(null)
const messageText = ref('')
const messageType = ref('success')
const isVisible = ref(false)
const isHiding = ref(false)

const messageClass = computed(() => ({
    'show': isVisible.value && !isHiding.value,
    'hide': isHiding.value
}))

const typeClass = computed(() => ({
    'error': messageType.value === 'error',
    'warn': messageType.value === 'warn',
    'success': messageType.value === 'success'
}))

let hideTimer = null

const showMessage = (text, type = 'success') => {
    // 清除之前的定时器
    if (hideTimer) {
        clearTimeout(hideTimer)
    }

    messageText.value = text
    messageType.value = type
    isVisible.value = true
    isHiding.value = false

    // 1.5秒后开始隐藏
    hideTimer = setTimeout(() => {
        hideMessage()
    }, 1500)
}

const hideMessage = () => {
    isHiding.value = true

    // 等待动画完成后隐藏
    setTimeout(() => {
        isVisible.value = false
        isHiding.value = false
    }, 250) // 对应CSS动画时长
}

// 暴露方法给父组件使用
defineExpose({
    success: (text) => showMessage(text, 'success'),
    warn: (text) => showMessage(text, 'warn'),
    error: (text) => showMessage(text, 'error')
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/common/main.scss' as *;

.message-tip {
    display: none;
    position: fixed;
    left: 50%;
    top: 20px;
    height: 45px;
    transform: translateX(-50%);
    font-size: 16px;
    text-align: center;
    line-height: 45px;
    font-weight: bold;
    opacity: 0;
    border-radius: 8px;
    z-index: 9999;
    box-shadow: shadow(l);

    .message-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        border-radius: 8px;
        padding: 0 20px;

        &.success {
            @include c-t {
                color: color(c-g0);
                background-color: color(success);
            }
        }

        &.warn {
            @include c-t {
                color: color(c-g0);
                background-color: color(warning);
            }
        }

        &.error {
            @include c-t {
                color: color(c-g0);
                background-color: color(error);
            }
        }

        p {
            white-space: nowrap;
            margin: 0;
        }
    }
}

/* 通过弹出和收回动画显示/隐藏提示框 */
.message-tip.show {
    display: block;
    animation: slideDown 0.25s ease-out forwards;
}

.message-tip.hide {
    display: block;
    animation: slideUp 0.25s ease-in forwards;
    pointer-events: none;
}

@keyframes slideDown {
    0% {
        opacity: 0;
        transform: translateX(-50%) translateY(-10px);
    }

    100% {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

@keyframes slideUp {
    0% {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateX(-50%) translateY(-10px);
    }
}
</style>