<template>
    <div class="article-editor">
        <div class="editor">
            <AoEditor v-model="content" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import AoEditor from '../../common/AoEditor.vue';

// 定义 props 和 emits 实现双向绑定
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// 本地内容，用于内部处理
const content = ref(props.modelValue)

// 监听本地内容变化，同步到父组件
watch(content, (newValue) => {
  emit('update:modelValue', newValue)
})

// 监听父组件传入的 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  content.value = newValue
})
</script>

<style scoped lang="scss">
.article-editor {
    @include wh;
    height: 1000px;
    background-color: color(c-g);
}
</style>