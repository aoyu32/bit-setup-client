<template>
  <div class="ao-editor">
    <Editor :value="value" :plugins="plugins" @change="handleChange" />
    <Viewer :value="value" :plugins="plugins" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight' // 新增代码高亮插件
import { Editor, Viewer } from '@bytemd/vue-next'

const value = ref('# Hello World\n\nTry editing this text!')
const plugins = [
  gfm(),
  highlight(), // 添加代码高亮支持
  // 可以继续添加其他插件
]

const handleChange = (v) => {
  value.value = v // 这里需要实际更新value
  console.log(value.value)
}
</script>

<style lang="scss">
.ao-editor {
  display: grid;
  gap: 20px;
  height: 1500px; 
}

.bytemd {
  height: 100%;
}


</style>