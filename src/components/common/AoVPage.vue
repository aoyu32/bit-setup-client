<template>
  <div>
    <!-- 页面跳转输入框 -->
    <input type="text" v-model="inputPageNumber" placeholder="输入页码" class="custom-input" />
    <button type="button" @click="goToInputPage" class="custom-button">跳转</button>

    <!-- 使用作用域插槽自定义分页栏样式 -->
    <PaginationBar
      v-model="pageNumber"
      :total-row="totalRow"
      @change="handlePageChange"
      align="center"
    >
      <template #default="{ pageNumber, totalPage }">
        <div class="custom-pagination">
          <!-- 自定义上一页按钮 -->
          <PaginationPreviousPage>
            <template #default="{ disabled }">
              <button :disabled="disabled" class="custom-prev">上一页</button>
            </template>
          </PaginationPreviousPage>

          <!-- 自定义页码 -->
          <PaginationPageNumbers>
            <template #default="{ pages, active }">
              <span v-for="page in pages" :key="page" :class="{ 'custom-page': true, 'active': page === active }">
                {{ page }}
              </span>
            </template>
          </PaginationPageNumbers>

          <!-- 自定义下一页按钮 -->
          <PaginationNextPage>
            <template #default="{ disabled }">
              <button :disabled="disabled" class="custom-next">下一页</button>
            </template>
          </PaginationNextPage>
        </div>
      </template>
    </PaginationBar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  PaginationBar,
  PaginationPreviousPage,
  PaginationPageNumbers,
  PaginationNextPage
} from 'v-page'

// 响应式变量
const pageNumber = ref(1) // 当前页码
const totalRow = ref(100) // 总记录数
const inputPageNumber = ref('') // 页面跳转输入
const pageSize = ref(10) // 每页记录数
const list = ref([]) // 数据列表

// 模拟数据
const mockData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`
}))

// 初始化数据
function fetchData(page = 1, size = 10) {
  const start = (page - 1) * size
  const end = Math.min(start + size, mockData.length)
  list.value = mockData.slice(start, end)
}

// 初始加载数据
fetchData(pageNumber.value, pageSize.value)

// 处理分页变化事件
function handlePageChange(data) {
  console.log('页面变化：', data) // { pageNumber, pageSize, totalPage }
  pageNumber.value = data.pageNumber
  pageSize.value = data.pageSize
  fetchData(data.pageNumber, data.pageSize)
  // 可替换为实际 API 请求，例如：
  // axios.post('your-api', { pageNumber: data.pageNumber, pageSize: data.pageSize })
  //   .then(resp => {
  //     list.value = resp.data.list || []
  //     totalRow.value = resp.data.totalRow
  //   })
}

// 处理页面跳转
function goToInputPage() {
  if (!inputPageNumber.value) return

  const newPageNumber = Number(inputPageNumber.value)

  // 验证输入
  if (isNaN(newPageNumber) || newPageNumber < 1) {
    inputPageNumber.value = ''
    return
  }

  // 确保页码在有效范围内
  const totalPage = Math.ceil(totalRow.value / pageSize.value)
  if (newPageNumber > totalPage) {
    inputPageNumber.value = totalPage.toString()
    pageNumber.value = totalPage
  } else {
    pageNumber.value = newPageNumber
  }

  inputPageNumber.value = '' // 跳转后清空输入
  fetchData(pageNumber.value, pageSize.value)
}
</script>

<style scoped>
.custom-pagination {
  display: flex;
  gap: 10px;
  align-items: center;
  font-family: 'PingFang SC', sans-serif;
}

.custom-prev,
.custom-next {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.custom-prev:disabled,
.custom-next:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.custom-page {
  padding: 8px;
  cursor: pointer;
  color: #007bff;
}

.custom-page.active {
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}

.custom-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.custom-button {
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.data-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>