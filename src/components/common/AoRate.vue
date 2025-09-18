<template>
    <div class="ao-rate" @mouseleave="handleMouseLeave">
        <div v-for="(item, index) in stars" :key="index" class="ao-rating__item" @click="handleClick(index + 1)"
            @mouseenter="handleMouseEnter(index + 1)">
            <!-- 星星背景 -->
            <i class="ao-rating__star ao-rating__star--empty">★</i>

            <!-- 星星填充 -->
            <i class="ao-rating__star ao-rating__star--fill" :style="{ width: getStarWidth(index + 1) }">★</i>
        </div>

        <!-- 显示分值 -->
        <span v-if="showScore" class="ao-rating__text">
            {{ currentValue }}
        </span>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props定义
const props = defineProps({
    modelValue: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 5
    },
    allowHalf: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    showScore: {
        type: Boolean,
        default: false
    },
    colors: {
        type: Array,
        default: () => ['#F7BA2A', '#F7BA2A', '#F7BA2A']
    },
    voidColor: {
        type: String,
        default: '#C6D1DE'
    },
    allowClear: {
        type: Boolean,
        default: false
    }
})

// Emits定义
const emit = defineEmits(['update:modelValue', 'change'])

// 响应式数据
const hoverValue = ref(0)
const isHovering = ref(false)

// 计算属性
const stars = computed(() => {
    return Array.from({ length: props.max }, (_, index) => index)
})

const currentValue = computed(() => {
    return isHovering.value ? hoverValue.value : props.modelValue
})

// 工具方法
const getStarWidth = (starIndex) => {
    const value = currentValue.value

    if (value >= starIndex) {
        return '100%'
    } else if (value >= starIndex - 0.5 && props.allowHalf) {
        return '50%'
    } else {
        return '0%'
    }
}

const getStarColor = (starIndex) => {
    const value = currentValue.value
    const { colors } = props

    if (value >= starIndex) {
        const index = Math.min(Math.floor(starIndex - 1), colors.length - 1)
        return colors[index]
    }

    return props.voidColor
}

// 事件处理方法
const handleClick = (value) => {
    if (props.disabled) return

    // 如果允许清空且点击的是当前值，则清空
    if (props.allowClear && value === props.modelValue) {
        value = 0
    } else if (props.allowHalf) {
        // 半星评分逻辑
        const decimal = value - Math.floor(value)
        if (decimal < 0.5) {
            value = Math.floor(value) + 0.5
        } else {
            value = Math.ceil(value)
        }
    }

    emit('update:modelValue', value)
    emit('change', value)
}

const handleMouseEnter = (value) => {
    if (props.disabled) return

    isHovering.value = true
    hoverValue.value = value
}

const handleMouseLeave = () => {
    if (props.disabled) return

    isHovering.value = false
    hoverValue.value = 0
}

// 监听器
watch(() => props.modelValue, (newValue) => {
    if (newValue < 0) {
        emit('update:modelValue', 0)
    } else if (newValue > props.max) {
        emit('update:modelValue', props.max)
    }
})
</script>

<style scoped lang="scss">
.ao-rate {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 18px;

    &__item {
        position: relative;
        display: inline-block;
        cursor: pointer;
        color: #C6D1DE;
        transition: color 0.2s;

        &:hover {
            transform: scale(1.1);
        }
    }

    &__star {
        display: inline-block;
        transition: all 0.2s;

        &--empty {
            color: #C6D1DE;
        }

        &--fill {
            position: absolute;
            left: 0;
            top: 0;
            overflow: hidden;
            color: #F7BA2A;
            transition: width 0.2s, color 0.2s;
        }
    }

    &__text {
        margin-left: 8px;
        font-size: 14px;
        color: #606266;
        font-weight: 500;
    }

    // 禁用状态
    &--disabled {
        cursor: not-allowed;

        .ao-rating__item {
            cursor: not-allowed;

            &:hover {
                transform: none;
            }
        }
    }

    // 不同尺寸
    &--small {
        font-size: 14px;

        .ao-rating__text {
            font-size: 12px;
        }
    }

    &--large {
        font-size: 22px;

        .ao-rating__text {
            font-size: 16px;
        }
    }
}

// 响应式设计
@media (max-width: 768px) {
    .ao-rating {
        font-size: 16px;
        gap: 1px;

        &__text {
            font-size: 12px;
        }
    }
}
</style>