<template>
  <div class="ao-progress">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: '45%' }"></div>
    </div>
  </div>
</template>

<script setup>
// 这里可以添加 props 和逻辑，目前只展示样式
</script>

<style scoped lang="scss">
.ao-progress {
  width: 100%;
  
  .progress-bar {
    width: 100%;
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
    }
  }
}

// 可选的尺寸变体
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
  }
}
</style>