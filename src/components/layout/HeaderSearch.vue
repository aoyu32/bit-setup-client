<template>
  <div class="header-search">
    <div class="search-container" ref="searchContainer">
      <div class="input-wrapper" :class="{ focus: isShowPanel }">
        <input type="text" v-model="searchText" @focus="handleFocus" @blur="handleBlur" @keyup.enter="handleSearch"
          placeholder="请输入搜索内容" ref="inputRef" />
        <div class="clear-input" v-if="searchText !== ''" @mousedown.prevent="handleClearInput">
          <i class="iconfont icon-close"></i>
        </div>
        <div class="search-icon" @click="handleSearch">
          <i class="iconfont icon-sousuo"></i>
        </div>
      </div>

      <!-- 搜索历史/建议面板 -->
      <div class="search-panel" v-show="isShowPanel">
        <!-- 搜索历史 -->
        <div class="search-history" v-if="isShowHistory">
          <div class="history-header">
            <div class="history-label">
              <span>搜索历史</span>
            </div>
            <div class="history-clear">
              <span>清空</span>
              <span><i class="iconfont icon-qingchu"></i></span>
            </div>
          </div>
          <div class="history-main">
            <div class="history-items" v-if="searchHistory.length > 0">
              <div class="history-item" v-for="(item, index) in searchHistory" :key="index">
                <span>{{ item }}</span>
                <div class="delete-icon">
                  <i class="iconfont icon-close"></i>
                </div>
              </div>
            </div>
            <div class="no-history" v-else>
              <span><i class="iconfont icon-expression"></i></span>
              <span>你目前没有搜索历史~</span>
            </div>
          </div>
        </div>

        <!-- 搜索建议 -->
        <div class="search-suggestion" v-else>
          <ul>
            <li v-for="(item, index) in mockSuggestions">{{ item }}</li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const inputRef = ref(null)
const searchText = ref('')
const isShowPanel = ref(false)
const isShowHistory = ref(true)

// 模拟搜索建议数据
const mockSuggestions = [
  'Vue3',
  'Vue3 教程',
  'Vue3 组件',
  'Vue3 源码',
  'Vue3 实战',
  'Vue3 组合式API',
  'Vue3 响应式原理'
]

const searchHistory = ref([
  "vue3",
  "react hooks最佳实践",
  "如何学习TypeScript",
  "js",
  "2023前端发展趋势",
  "css动画效果",
  "node.js性能优化",
  "webpack配置",
  "es6新特性",
  "前端面试题",
  "python",
  "机器学习入门",
  "rust vs go",
  "docker部署前端项目",
  "git高级用法",
  "如何提高代码质量",
  "前端性能优化技巧",
  "小程序开发",
  "nuxt.js服务端渲染",
  "大前端技术栈",
  "算法",

])

// 处理聚焦
const handleFocus = () => {
  isShowPanel.value = true
}


const handleClearInput = () => {
  searchText.value = ''
}


// 处理失去焦点
const handleBlur = () => {
  isShowPanel.value = false

}

// 处理搜索
const handleSearch = () => {
  if (!searchText.value.trim()) {
    return
  }

  const route = router.resolve({
    path: '/search',
    query: { all: searchText.value }
  });


  window.open(route.href, '_blank');
}

watch(() => searchText.value, () => {
  if (!searchText.value.trim()) {
    isShowHistory.value = true
  } else {
    isShowHistory.value = false
  }
})

</script>

<style scoped lang="scss">
@use '@/assets/styles/layout/_header-search.scss' as *;
</style>