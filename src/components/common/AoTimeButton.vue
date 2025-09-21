<template>
    <div class="ao-time-button">
        <button type="button" :disabled="disabled || counting" @click="handleClick">
            {{ currentText }}
        </button>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
    text: {
        type: String,
        default: '获取验证码'
    },
    countdown: {
        type: Number,
        default: 60
    },
    disabled: {
        type: Boolean,
        default: false
    },
    // 新增：重置标志，当这个值变化时会重置计时状态
    reset: {
        type: [Boolean, Number],
        default: false
    }
})

const emit = defineEmits(['click'])

const counting = ref(false)
const remainingTime = ref(0)
let timer = null

// 当前显示的文本
const currentText = computed(() => {
    if (counting.value) {
        return `${remainingTime.value}秒`
    }
    return props.text
})

// 开始倒计时
const startCountdown = () => {
    counting.value = true
    remainingTime.value = props.countdown

    timer = setInterval(() => {
        remainingTime.value--

        if (remainingTime.value <= 0) {
            stopCountdown()
        }
    }, 1000)
}

// 停止倒计时
const stopCountdown = () => {
    counting.value = false
    remainingTime.value = 0
    if (timer) {
        clearInterval(timer)
        timer = null
    }
}

// 重置计时状态
const resetCountdown = () => {
    stopCountdown()
}

// 处理按钮点击
const handleClick = () => {
    if (!props.disabled && !counting.value) {
        emit('click')
        startCountdown()
    }
}

// 监听 reset prop 的变化
watch(() => props.reset, (newVal, oldVal) => {
    // 当 reset 值发生变化时重置计时
    if (newVal !== oldVal && newVal) {
        resetCountdown()
    }
})

// 暴露重置方法给父组件
defineExpose({
    resetCountdown,
    startCountdown,
    stopCountdown,
    counting: computed(() => counting.value),
    remainingTime: computed(() => remainingTime.value)
})

// 组件卸载时清理定时器
onUnmounted(() => {
    if (timer) {
        clearInterval(timer)
    }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/common/main.scss' as *;

.ao-time-button {
    @include wh;

    button {
        @include wh(100p, n);
        flex: 1;
        @include b-r($b-r);
        padding: 12px;
        font-size: 12px;

        @include c-t {
            background-color: color(c-s-light);
            color: color(c-g);
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }
    }
}
</style>