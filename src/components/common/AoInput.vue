<template>
    <div class="ao-input">
        <div class="input-wrapper" :class="{ 'input-error': errorMessage }">
            <!-- 左侧图标插槽 -->
            <div class="left-icon">
                <slot name="icon"></slot>
            </div>
            <!-- 输入框，支持类型、占位符、双向绑定，根据 rules 配置事件 -->
            <input ref="inputRef" :type="internalType" :placeholder="placeholder" v-model="inputValue"
                @input="handleInput" @blur="handleBlur" @focus="handleFocus">
            <!-- 右侧图标占位，仅在输入值不为空时显示 -->
            <div class="right-icon" @click.prevent="handleIconClick" v-if="showIcon">
                <i :class="['iconfont', iconClass]"></i>
            </div>
        </div>
        <!-- 输入提示区域，仅在有校验规则时渲染，用于显示错误信息 -->
        <div class="input-tip" v-if="props.rules.length > 0">
            <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, defineExpose } from 'vue'

// 定义组件的属性
const props = defineProps({
    placeholder: {
        type: String,
        default: '请输入内容'
    },
    type: {
        type: String,
        default: 'text',
        validator: (value) => ['text', 'password', 'email', 'number'].includes(value)
    },
    rules: {
        type: Array,
        default: () => [],
        validator: (rules) => rules.every(rule => {
            if (typeof rule === 'function') return true
            return (
                typeof rule === 'object' &&
                typeof rule.validator === 'function' &&
                ['input', 'blur', 'focus'].includes(rule.trigger)
            )
        })
    },
    modelValue: {
        type: [String, Number],
        default: ''
    }
})

// 定义事件
const emit = defineEmits(['update:modelValue', 'valid','invalid'])

// 内部状态
const internalType = ref(props.type)
const inputValue = ref(props.modelValue)
const errorMessage = ref('')
const inputRef = ref(null) // 用于操作 input 元素的 DOM

// 计算属性
const showIcon = computed(() => inputValue.value.length > 0)
const iconClass = computed(() => {
    if (props.type === 'password') {
        return internalType.value === 'password' ? 'icon-kejian' : 'icon-bukejian'
    }
    return 'icon-quxiao'
})

// 防抖函数
const debounce = (func, delay) => {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), delay)
    }
}

// 校验函数，仅在输入值不为空时触发
const validateInput = () => {
    errorMessage.value = ''
    if (props.rules.length > 0) {
        for (const rule of props.rules) {
            const validator = typeof rule === 'function' ? rule : rule.validator
            const result = validator(inputValue.value)
            if (result !== true) {
                errorMessage.value = result
                emit('invalid', result)
                return false
            }
        }
        emit('valid', inputValue.value)
        return true
    }
}

// 防抖校验
const debouncedValidate = debounce(validateInput, 300)

// 事件处理
const handleInput = () => {
    if (props.rules.some(rule => typeof rule === 'object' && rule.trigger === 'input')) {
        debouncedValidate()
    }
}

const handleBlur = () => {
    if (props.rules.some(rule => typeof rule === 'function' || rule.trigger === 'blur')) {
        validateInput()
    }
}

const handleFocus = () => {
    errorMessage.value = ''
    if (props.rules.some(rule => typeof rule === 'object' && rule.trigger === 'focus')) {
        validateInput()
    }
}

const handleIconClick = (event) => {
    event.stopPropagation() // 阻止事件冒泡
    event.preventDefault() // 阻止默认行为
    if (props.type === 'password') {
        internalType.value = internalType.value === 'password' ? 'text' : 'password'
    } else {
        inputValue.value = ''
        emit('update:modelValue', '')
        errorMessage.value = '' // 清空错误信息
    }
    // 如果输入框原本聚焦，恢复焦点
    inputRef.value.focus()
}

// 监听 modelValue 变化
watch(() => props.modelValue, (newValue) => {
    if (newValue !== inputValue.value) {
        inputValue.value = newValue
        if (newValue && props.rules.length > 0) {
            validateInput()
        } else {
            errorMessage.value = ''
        }
    }
})

// 监听输入值变化
watch(inputValue, (newValue) => {
    emit('update:modelValue', newValue)
})

// 监听 rules 变化
watch(() => props.rules, () => {
    if (inputValue.value && props.rules.length > 0) {
        validateInput()
    }
}, { deep: true })

// 监听 type 变化
watch(() => props.type, (newType) => {
    internalType.value = newType
})

// 暴露手动校验方法
defineExpose({
    validate: validateInput
})
</script>

<style lang="scss" scoped>
.ao-input {
    width: 100%;
    height: 100%;

    .input-wrapper {
        display: flex;
        align-items: center;
        line-height: 1.5;
        color: #333;
        padding: 0 15px;
        outline: none;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        transition: all 0.3s ease;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        position: relative;

        &:focus-within {
            border-color: #4d90fe;
            box-shadow: 0 0 0 3px rgba(77, 144, 254, 0.2);
        }

        &.input-error {
            border-color: #ff4d4f;
            box-shadow: 0 0 0 3px rgba(255, 77, 79, 0.2);
        }
    }

    input {
        width: 100%;
        height: 100%;
        padding: 10px 0px;
        font-size: 14px;
        letter-spacing: 0.2px;
        border: none;
        outline: none;
        background: transparent;

        &::placeholder {
            color: #999;
            opacity: 1;
            font-size: 14px;
        }
    }

    .left-icon {
        cursor: pointer;
        font-size: 16px;
        color: #999;
        padding-right: 8px;
        user-select: none;
    }

    .right-icon {
        cursor: pointer;
        font-size: 16px;
        color: #999;
        padding-left: 8px;
        user-select: none;

        &:hover {
            color: #666;
        }

        i {
            display: inline-block;
        }
    }

    .input-tip {
        margin-top: 4px;
        height: 14px; // 使用 min-height 支持多行错误文本
        font-size: 12px;
    }

    .error-text {
        color: #ff4d4f;
        font-size: 12px;
        margin: 0;
    }
}
</style>