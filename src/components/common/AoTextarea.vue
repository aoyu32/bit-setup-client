<template>
    <div class="ao-textarea">
        <textarea :value="modelValue" :placeholder="placeholder" ref="textareaRef" @input="onInput"></textarea>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: '请输入内容'
    }
})

const emit = defineEmits(['update:modelValue'])

const textareaRef = ref(null)

const adjustTextareaHeight = () => {
    const textarea = textareaRef.value
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
}

const onInput = (event) => {
    emit('update:modelValue', event.target.value)
    adjustTextareaHeight()
}

onMounted(() => {
    adjustTextareaHeight()
})
</script>

<style lang="scss" scoped>
.ao-textarea {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;

    textarea {
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

        &::placeholder {
            color: #999;
            opacity: 1;
        }

        &:focus {
            border-color: #4d90fe;
        }
    }
}
</style>
