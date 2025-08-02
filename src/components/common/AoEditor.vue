<template>
  <div class="ao-editor">
    <Editor :value="value" :plugins="plugins" @change="handleChange" model="tab" placeholder="请在这里编辑内容" :locale="zhHans"
      :icons="customIcons" />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight' // 新增代码高亮插件
import zhHans from 'bytemd/locales/zh_Hans.json';
import { Editor, Viewer } from '@bytemd/vue-next'
import 'juejin-markdown-themes/dist/z-blue.min.css'

const value = ref('')
const plugins = [
  gfm(),
  highlight(), // 添加代码高亮支持
  // 可以继续添加其他插件
]

const customIcons = {
  bold: '<svg viewBox="0 0 24 24"><path d="M15.6 11.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 7.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>',
  // 可以覆盖其他图标...
};

const handleChange = (v) => {
  value.value = v // 这里需要实际更新value
  console.log(value.value)
}
</script>

<style lang="scss">
.ao-editor {
  @include wh;
}

.bytemd {
  @include wh;
  min-height: 1000px;

  // @include c-t {
  //   // background-color: color(c-g1);
  //   color: color(c-g9);
  //   border: 1px solid color(c-g);
  // }
}

// .bytemd-toolbar {
//   @include c-t {
//     // background-color: color(c-g1);
//     color: color(c-g9);
//     border-bottom: 1px solid color(c-g);
//   }
// }

// .bytemd-split .bytemd-preview {
//   @include c-t {
//     border-left: 1px solid color(c-g);
//   }
// }

// .bytemd-status{
//   @include c-t{
//     border-top: 1px solid color(c-g);
//   }
// }

// .CodeMirror {
//   @include c-t {
//     // background-color: color(c-g1);
//     color: color(c-g9);
//   }
// }

.bytemd-toolbar-right [bytemd-tippy-path='5'],
.bytemd-toolbar-right [bytemd-tippy-path='4'] {
  display: none;
}
</style>