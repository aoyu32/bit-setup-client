<template>
  <div 
    class="ao-switch"
    :class="{ 'asc': isAscending, 'desc': !isAscending }"
    @click="toggleSort"
  >
    <span class="text asc">a~z</span>
    <span class="text desc">z~a</span>
    <span class="slider"></span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['change']);

const isAscending = ref(true);

const toggleSort = () => {
  isAscending.value = !isAscending.value;
  emit('change', isAscending.value ? 'asc' : 'desc');
};
</script>

<style scoped>
.ao-switch {
  --switch-height: 25px;
  --switch-padding: 2px;
  --slider-size: calc(var(--switch-height) - 2 * var(--switch-padding));
  
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 70px;
  height: var(--switch-height);
  border-radius: 999px;
  background-color: #2196F3; /* 升序时的背景色 */
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.sort-switch.desc {
  background-color: #a6a4a4; /* 降序时的背景色 */
}

.text {
  position: relative;
  z-index: 2;
  flex: 1;
  text-align: center;
  line-height: 100%;
  color: white;
  font-weight: bold;
  font-size: 55%; /* 根据容器高度自适应 */
  user-select: none;
  transition: color 0.3s ease;
}

.slider {
  position: absolute;
  z-index: 1;
  left: var(--switch-padding);
  top: var(--switch-padding);
  width: 50%;
  height: var(--slider-size);
  background-color: white;
  border-radius: 999px;
  transition: all 0.3s ease;
}

.sort-switch.desc .slider {
  left: calc(50% - var(--switch-padding));
}

/* 文字在滑块移动时变色效果 */
.sort-switch.asc .desc {
  color: rgba(255, 255, 255, 0.7);
}

.sort-switch.desc .asc {
  color: rgba(255, 255, 255, 0.7);
}
</style>