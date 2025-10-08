<template>
  <div class="ao-pagination">
    <div class="pre-page page-button">
      <button @click="handlePageChange(currentPageNum - 1)" :disabled="currentPageNum <= 1">
        <span><i class="iconfont icon-left"></i></span>
      </button>
    </div>
    <div class="page-num">
      <div class="page-num-item" v-for="(item, index) in pageNums" :key="index" @click="handlePageClick(item)"
        :class="{ active: currentPageNum === item && item !== '...', ellipsis: item === '...' }">
        <span>{{ item }}</span>
      </div>
    </div>
    <div class="next-page page-button">
      <button @click="handlePageChange(currentPageNum + 1)" :disabled="currentPageNum >= pageNumCount">
        <span><i class="iconfont icon-right"></i></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const emit = defineEmits(['page-change'])

const props = defineProps({
  // 当前页码
  currentPageNum: {
    type: Number,
    default: 1,
  },
  // 每页显示数量
  pageSize: {
    type: Number,
    default: 10
  },
  // 最大显示页码数量(不包括省略号)
  maxPageNum: {
    type: Number,
    default: 9
  },
  // 总数据量
  total: {
    type: Number,
    required: true,
    default:0
  }
})

// 计算总页数
const pageNumCount = computed(() => {
  return Math.ceil(props.total / props.pageSize)
})


const pageNums = computed(() => {
  const totalPages = pageNumCount.value
  const maxShow = props.maxPageNum
  const current = props.currentPageNum

  if (totalPages <= maxShow) {
    // 总页数不超过最大显示数，显示所有页码
    let pageNumArr = []
    for (let i = 0; i < totalPages; i++) {
      pageNumArr.push(i + 1)
    }
    return pageNumArr
  } else {
    // 需要折叠显示
    let pageNumArr = []

    // 计算边界值（动态计算，不再写死）
    const boundary = Math.floor((maxShow - 3) / 2) // 减去首页、末页、一个省略号后，两边各显示几个
    const leftBoundary = Math.max(boundary, 2) // 至少显示到第2页
    const rightBoundary = Math.max(boundary, 2) // 至少显示倒数第2页

    if (current <= leftBoundary + 1) {
      // 当前页靠近开头
      const showCount = Math.min(maxShow - 2, totalPages - 1) // 减去末页和省略号
      for (let i = 1; i <= showCount; i++) {
        pageNumArr.push(i)
      }
      if (totalPages > maxShow - 1) {
        pageNumArr.push('...')
      }
      if (totalPages > 1) {
        pageNumArr.push(totalPages)
      }
    } else if (current >= totalPages - rightBoundary) {
      // 当前页靠近末尾
      pageNumArr.push(1)
      if (totalPages > maxShow - 1) {
        pageNumArr.push('...')
      }
      const startPage = Math.max(totalPages - (maxShow - 3), 2)
      for (let i = startPage; i <= totalPages; i++) {
        pageNumArr.push(i)
      }
    } else {
      // 当前页在中间
      pageNumArr.push(1)
      pageNumArr.push('...')

      // 中间显示的页码数量
      const middleCount = maxShow - 4 // 减去首页、末页、两个省略号
      const middleHalf = Math.floor(middleCount / 2)

      for (let i = current - middleHalf; i <= current + middleHalf; i++) {
        pageNumArr.push(i)
      }

      pageNumArr.push('...')
      pageNumArr.push(totalPages)
    }

    return pageNumArr
  }
})

const handlePageClick = (item) => {
  if (item === '...' || item === props.currentPageNum) {
    return
  }
  handlePageChange(item)
}

// 处理页码变更
const handlePageChange = (page) => {
  if (page < 1 || page > pageNumCount.value || page === props.currentPageNum) {
    return
  }
  emit('page-change', page)
}

// 监听当前页变化
watch(() => props.currentPageNum, (newValue) => {
  console.log('当前页码变更为:', newValue)
})
</script>

<style lang="scss" scoped>
.ao-pagination {
  @include wh;
  @include flex(c, c);
  gap: 15px;
  padding: 15px;

  .page-button {
    button {
      @include wh(35);
      @include b-r(3);
      @include flex(c, c);
      transition: all 0.3s ease-out;
      span {
        @include flex(c, c);
      }

      @include c-t {
        color: color(c-g);
        background-color: color(c-g9,0.2);
      }

      &:hover {

        @include c-t {
          color: color(c-g);
          background-color: color(c-s-light);
        }
      }

    }
  }

  .page-num {
    @include flex(c, c);
    gap: 15px;

    .page-num-item {
      cursor: pointer;
      @include wh(35);
      @include flex(c, c);
      font-size: 14px;
      @include b-r(3);

      @include c-t {
        color: color(c-g);
        background-color: color(c-g2);
      }

      &.ellipsis {
        cursor: default;
      }
    }

    .active {
      @include c-t {
        color: color(c-g);
        background-color: color(c-p-lighter);
      }
    }
  }
}
</style>