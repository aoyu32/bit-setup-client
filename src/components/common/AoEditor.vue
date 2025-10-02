<template>
  <div class="ao-editor">
    <Editor :value="modelValue" :plugins="plugins" @change="handleChange" mode="split" placeholder="请在这里编辑内容"
      :locale="zhHans" :icons="customIcons" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import zhHans from 'bytemd/locales/zh_Hans.json';
import { Editor, Viewer } from '@bytemd/vue-next'
import 'juejin-markdown-themes/dist/z-blue.min.css'

// 定义 props 和 emits
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const plugins = [
  gfm(),
  highlight(),
]

const customIcons = {
  bold: '<svg viewBox="0 0 24 24"><path d="M15.6 11.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 7.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>',
}

const handleChange = (v) => {
  emit('update:modelValue', v)
}
</script>

<style lang="scss">
.ao-editor {
  @include wh;
}

.bytemd {
  @include wh;
  min-height: 1000px;
}

.bytemd-toolbar-right [bytemd-tippy-path='5'],
.bytemd-toolbar-right [bytemd-tippy-path='4'] {
  display: none;
}
</style>