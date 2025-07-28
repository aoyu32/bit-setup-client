const aiChatData = [
    // {
    //     role: 'user',
    //     content: '你好，我想了解一下Vue3的新特性'
    // },
    // {
    //     role: 'ai',
    //     content: '## Vue3 主要新特性\n\n1. **Composition API** - 更灵活的代码组织方式\n2. **更快的渲染** - 重写了虚拟DOM\n3. **更小的体积** - 更好的tree-shaking支持\n4. **TypeScript支持** - 更好的TS集成'
    // },
    // {
    //     role: 'user',
    //     content: 'Composition API和Options API有什么区别？'
    // },
    // {
    //     role: 'ai',
    //     content: '### Composition API vs Options API\n\n| 特性 | Composition API | Options API |\n|------|----------------|-------------|\n| 代码组织 | 按逻辑功能组织 | 按选项类型组织 |\n| 复用性 | 更容易复用逻辑 | 需要通过mixins |\n| TypeScript支持 | 更好 | 一般 |\n\n```javascript\n// Composition API 示例\nconst { ref, computed } = Vue\nsetup() {\n  const count = ref(0)\n  const double = computed(() => count.value * 2)\n  return { count, double }\n}\n```'
    // },
    // {
    //     role: 'user',
    //     content: '那性能方面有多大提升？'
    // },
    // {
    //     role: 'ai',
    //     content: '## Vue3 性能提升\n\n- **打包体积减少**：约 **41%** 缩小\n- **渲染速度提升**：约 **55%** 更快\n- **内存占用减少**：约 **54%** 更低\n\n> 实际效果取决于应用复杂度，但大多数场景都有显著提升'
    // },
    // {
    //     role: 'user',
    //     content: 'Pinia是什么？它和Vuex有什么区别？'
    // },
    // {
    //     role: 'ai',
    //     content: '### Pinia 介绍\n\nPinia是Vue的**新一代状态管理库**，相比Vuex有这些优势：\n\n1. **更简单的API** - 不需要mutations\n2. **TypeScript支持** - 完全类型化的API\n3. **模块化设计** - 自动代码分割\n4. **轻量级** - 约1KB大小\n\n```javascript\n// 使用示例\nimport { defineStore } from \'pinia\'\n\nexport const useStore = defineStore(\'main\', {\n  state: () => ({ count: 0 }),\n  actions: {\n    increment() { this.count++ }\n  }\n})\n```'
    // },
    // {
    //     role: 'user',
    //     content: 'Vue3的响应式原理是什么？'
    // },
    // {
    //     role: 'ai',
    //     content: '## Vue3 响应式原理\n\nVue3使用`Proxy`代替了Vue2的`Object.defineProperty`：\n\n- **Proxy优势**：\n  - 可以检测**属性新增/删除**\n  - 更好的数组变化检测\n  - 性能更好\n\n**核心代码结构**：\n\n```javascript\nfunction reactive(obj) {\n  return new Proxy(obj, {\n    get(target, key) {\n      track(target, key) // 依赖收集\n      return Reflect.get(target, key)\n    },\n    set(target, key, value) {\n      trigger(target, key) // 触发更新\n      return Reflect.set(target, key, value)\n    }\n  })\n}\n```'
    // },
    // {
    //     role: 'user',
    //     content: 'Vite和Webpack有什么区别？'
    // },
    // {
    //     role: 'ai',
    //     content: '### Vite vs Webpack\n\n| 特性 | Vite | Webpack |\n|------|------|---------|\n| 启动速度 | ⚡️ **极快** (原生ESM) | 较慢 (需要打包) |\n| HMR更新 | 🔥 **即时** | 较快 |\n| 生产构建 | 使用Rollup | 自带打包 |\n| 配置复杂度 | 简单 | 较复杂 |\n| 生态 | 成长中 | 非常成熟 |\n\n**推荐场景**：\n- 新项目 → Vite\n- 大型现有项目 → Webpack'
    // },
    // {
    //     role: 'user',
    //     content: 'Vue3的Teleport组件是做什么用的？'
    // },
    // {
    //     role: 'ai',
    //     content: '## Teleport 组件\n\nTeleport允许你将组件**渲染到DOM树的任意位置**，常用于：\n\n- 模态框(Modal)\n- 通知(Toast)\n- 弹出菜单\n\n**基本用法**：\n\n```html\n<template>\n  <button @click="showModal = true">打开模态框</button>\n  \n  <Teleport to="body">\n    <Modal v-if="showModal" @close="showModal = false" />\n  </Teleport>\n</template>\n```\n\n这样`Modal`会被渲染到`<body>`下，避免z-index和overflow问题'
    // },
    // {
    //     role: 'user',
    //     content: '谢谢你的解答！'
    // },
    // {
    //     role: 'ai',
    //     content: '不客气！😊 如果有任何其他关于Vue3的问题，随时可以问我。\n\n**推荐资源**：\n- [Vue3官方文档](https://vuejs.org/)\n- [Vue Mastery教程](https://www.vuemastery.com/)\n- [Vue School课程](https://vueschool.io/)\n\n祝你编码愉快！'
    // }
];

export default aiChatData