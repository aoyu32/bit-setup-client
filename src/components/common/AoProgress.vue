<template>
  <div class="ao-progress" :class="size">
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="fillStyle"
        :class="{ 'animate': animate }"
      ></div>
    </div>
    <!-- 可选：显示进度百分比 -->
    <div v-if="showText" class="progress-text">
      <span>{{ displayPercentage }}%</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 定义props
const props = defineProps({
  // 当前进度值
  current: {
    type: Number,
    default: 0
  },
  // 总进度值
  total: {
    type: Number,
    default: 100
  },
  // 直接设置百分比 (0-100)，优先级高于 current/total
  percentage: {
    type: Number,
    default: undefined
  },
  // 进度条尺寸
  size: {
    type: String,
    default: 'default', // 'small' | 'default' | 'large'
    validator: (value) => ['small', 'default', 'large'].includes(value)
  },
  // 是否显示进度文本
  showText: {
    type: Boolean,
    default: false
  },
  // 是否开启动画效果
  animate: {
    type: Boolean,
    default: true
  },
  // 动画持续时间 (ms)
  duration: {
    type: Number,
    default: 300
  },
  // 自定义颜色
  color: {
    type: String,
    default: ''
  },
  // 渐变颜色 [起始色, 结束色]
  gradient: {
    type: Array,
    default: () => ['#ecf629', '#edba3a']
  }
})

// 计算实际百分比
const actualPercentage = computed(() => {
  // 如果直接设置了percentage，优先使用
  if (props.percentage !== undefined) {
    return Math.min(Math.max(props.percentage, 0), 100)
  }
  
  // 使用current和total计算百分比
  if (props.total <= 0) return 0
  
  const calculated = (props.current / props.total) * 100
  return Math.min(Math.max(calculated, 0), 100)
})

// 显示用的百分比（四舍五入到整数）
const displayPercentage = computed(() => {
  return Math.round(actualPercentage.value)
})

// 进度条填充样式
const fillStyle = computed(() => {
  const style = {
    width: `${actualPercentage.value}%`,
    transition: props.animate ? `width ${props.duration}ms ease` : 'none'
  }
  
  // 设置颜色
  if (props.color) {
    style.backgroundColor = props.color
  } else if (props.gradient && props.gradient.length >= 2) {
    style.background = `linear-gradient(90deg, ${props.gradient[0]} 0%, ${props.gradient[1]} 100%)`
  }
  
  return style
})
</script>

<style scoped lang="scss">
.ao-progress {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  
  .progress-bar {
    flex: 1;
    height: 5px;
    background-color: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #ecf629 0%, #edba3a 100%);
      border-radius: 4px;
      transition: width 0.3s ease;
      position: relative;
      
      // 可选：添加微妙的光泽效果
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 50%;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
        border-radius: 4px 4px 0 0;
      }
      
      // 动画效果
      &.animate {
        transition: width v-bind('props.duration + "ms"') ease;
      }
    }
  }
  
  .progress-text {
    min-width: 40px;
    font-size: 12px;
    color: #666;
    text-align: right;
    
    span {
      font-weight: 500;
    }
  }
}

// 尺寸变体
.ao-progress {
  // 小尺寸
  &.small {
    .progress-bar {
      height: 4px;
      border-radius: 2px;
      
      .progress-fill {
        border-radius: 2px;
        
        &::after {
          border-radius: 2px 2px 0 0;
        }
      }
    }
    
    .progress-text {
      font-size: 11px;
    }
  }
  
  // 大尺寸
  &.large {
    .progress-bar {
      height: 12px;
      border-radius: 6px;
      
      .progress-fill {
        border-radius: 6px;
        
        &::after {
          border-radius: 6px 6px 0 0;
        }
      }
    }
    
    .progress-text {
      font-size: 14px;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .ao-progress {
    gap: 6px;
    
    .progress-text {
      min-width: 35px;
      font-size: 11px;
    }
    
    &.large .progress-text {
      font-size: 12px;
    }
  }
}
</style>