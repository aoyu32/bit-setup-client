<template>
  <div class="header-search">
    <div class="search-container" ref="searchContainer">
      <div class="input-wrapper" :class="{ 'focus': isFocus }">
        <input
          type="text"
          v-model="searchText"
          @focus="handleFocus"
          @blur="handleBlur"
          @keyup.enter="handleSearch"
          placeholder="请输入搜索内容"
        />
        <div class="search-icon" @click="handleSearch">
          <i class="iconfont icon-sousuo"></i>
        </div>
      </div>
      
      <!-- 搜索历史/建议面板 -->
      <div class="search-panel" v-show="showPanel">
        <!-- 搜索历史 -->
        <div class="search-history" v-if="searchText === '' && searchHistory.length > 0">
          <div class="panel-header">
            <span>搜索历史</span>
            <span class="clear-history" @click="clearHistory">清空</span>
          </div>
          <ul class="history-list">
            <li
              v-for="(item, index) in searchHistory"
              :key="index"
              @click="selectHistory(item)"
            >
              {{ item }}
              <span class="delete-item" @click.stop="deleteHistory(index)">×</span>
            </li>
          </ul>
        </div>
        
        <!-- 搜索建议 -->
        <div class="search-suggestion" v-else-if="searchText !== '' && suggestions.length > 0">
          <ul class="suggestion-list">
            <li
              v-for="(item, index) in suggestions"
              :key="index"
              @click="selectSuggestion(item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        
        <!-- 无结果 -->
        <div class="no-result" v-else-if="searchText !== '' && suggestions.length === 0">
          暂无搜索结果
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const searchText = ref('')
const isFocus = ref(false)
const searchHistory = ref(JSON.parse(localStorage.getItem('searchHistory')) || [])
const suggestions = ref([])
const searchContainer = ref(null)

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

// 显示面板的条件
const showPanel = computed(() => {
  return isFocus.value && (searchHistory.value.length > 0 || searchText.value !== '')
})

// 处理聚焦
const handleFocus = () => {
  isFocus.value = true
}

// 处理失去焦点
const handleBlur = () => {
  setTimeout(() => {
    isFocus.value = false
  }, 200)
}

// 处理搜索
const handleSearch = () => {
  if (searchText.value.trim() === '') return
  
  // 添加到搜索历史
  addToHistory(searchText.value)
  
  // 实际搜索逻辑
  console.log('搜索:', searchText.value)
  
  // 清空输入
  searchText.value = ''
}

// 添加到搜索历史
const addToHistory = (keyword) => {
  // 移除重复项
  const index = searchHistory.value.indexOf(keyword)
  if (index !== -1) {
    searchHistory.value.splice(index, 1)
  }
  
  // 添加到开头
  searchHistory.value.unshift(keyword)
  
  // 限制历史记录数量
  if (searchHistory.value.length > 10) {
    searchHistory.value.pop()
  }
  
  // 保存到本地存储
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}

// 选择历史记录
const selectHistory = (keyword) => {
  searchText.value = keyword
  handleSearch()
}

// 删除单个历史记录
const deleteHistory = (index) => {
  searchHistory.value.splice(index, 1)
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}

// 清空历史记录
const clearHistory = () => {
  searchHistory.value = []
  localStorage.setItem('searchHistory', JSON.stringify([]))
}

// 选择搜索建议
const selectSuggestion = (keyword) => {
  searchText.value = keyword
  handleSearch()
}

// 监听输入变化，获取搜索建议
watch(searchText, (newVal) => {
  if (newVal.trim() === '') {
    suggestions.value = []
    return
  }
  
  // 模拟API请求获取搜索建议
  setTimeout(() => {
    suggestions.value = mockSuggestions.filter(item =>
      item.toLowerCase().includes(newVal.toLowerCase())
    )
  }, 300)
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/layout/_header-search.scss' as *;
</style>