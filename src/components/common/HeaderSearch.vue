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
.header-search {
  width: 100%;
  max-width: 400px;
  position: relative;

  .search-container {
    width: 100%;
    position: relative;

    .input-wrapper {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      border: 1px solid #e7e7e7;
      border-radius: 8px;
      background-color: #fff;
      transition: all 0.3s;
      box-sizing: border-box;
      overflow: hidden;

      &.focus {
        border-color: #fb7299; // B站粉色
      }

      input {
        flex: 1;
        height: 100%;
        padding: 0 12px;
        border: none;
        outline: none;
        font-size: 14px;
        color: #222;
        background: transparent;

        &::placeholder {
          color: #999;
        }
      }

      .search-icon {
        width: 40px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #999;
        transition: all 0.3s;

        &:hover {
          color: #fb7299;
        }
      }
    }

    .search-panel {
      position: absolute;
      top: 50px;
      left: 0;
      width: 100%;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 100;
      max-height: 400px;
      overflow-y: auto;

      .panel-header {
        display: flex;
        justify-content: space-between;
        padding: 10px 15px;
        font-size: 14px;
        color: #999;
        border-bottom: 1px solid #f1f1f1;

        .clear-history {
          color: #fb7299;
          cursor: pointer;

          &:hover {
            opacity: 0.8;
          }
        }
      }

      .history-list, .suggestion-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          padding: 10px 15px;
          font-size: 14px;
          color: #222;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:hover {
            background-color: #f8f8f8;
          }

          .delete-item {
            color: #999;
            font-size: 18px;
            padding: 0 5px;

            &:hover {
              color: #fb7299;
            }
          }
        }
      }

      .no-result {
        padding: 15px;
        text-align: center;
        color: #999;
        font-size: 14px;
      }
    }
  }
}
</style>