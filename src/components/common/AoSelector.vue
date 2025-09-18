<template>
  <div class="ao-selector">
    <div class="selector-wrapper">
      <div class="select-header" @click="handleDropDown">
        <div class="select-left">
          <slot name="left-icon"></slot>
          <span class="select-value">{{ displayValue }}</span>
        </div>
        <div class="select-right">
          <slot name="right-icon">
            <span class="right-icon" :class="{ 'rotate': dropDown }">
              <i class="iconfont icon-xiangxia-1"></i>
            </span>
          </slot>
        </div>
      </div>
      <div class="select-options" v-if="dropDown && options.length > 0">
        <ul>
          <li 
            v-for="(item, index) in options" 
            :key="index" 
            :class="{ 'selected': isSelected(item) }"
            @click="handleSelect(item)"
          >
            <slot name="option" :item="item" :index="index">
              {{ getItemLabel(item) }}
            </slot>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props定义
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  valueKey: {
    type: String,
    default: 'value'
  },
  labelKey: {
    type: String,
    default: 'label'
  }
})

// Emits定义
const emit = defineEmits(['update:modelValue', 'change'])

// 响应式数据
const dropDown = ref(false)

// 计算属性
const displayValue = computed(() => {
  if (!props.modelValue) return props.placeholder
  
  const selectedItem = props.options.find(item => 
    getItemValue(item) === props.modelValue
  )
  
  return selectedItem ? getItemLabel(selectedItem) : props.placeholder
})

// 工具方法
const getItemValue = (item) => {
  return typeof item === 'object' ? item[props.valueKey] : item
}

const getItemLabel = (item) => {
  return typeof item === 'object' ? item[props.labelKey] : item
}

const isSelected = (item) => {
  return getItemValue(item) === props.modelValue
}

// 事件处理方法
const handleDropDown = () => {
  dropDown.value = !dropDown.value
}

const handleSelect = (item) => {
  const value = getItemValue(item)
  emit('update:modelValue', value)
  emit('change', value, item)
  dropDown.value = false
}

const handleClickOutside = (e) => {
  if (dropDown.value && !e.target.closest('.ao-selector')) {
    dropDown.value = false
  }
}

// 生命周期
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.ao-selector {
  width: 100%;
  height: 100%;
  position: relative;
  font-family: inherit;
}

.selector-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.select-header {
  width: 100%;
  height: 100%;
  padding: 5px 12px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.select-header:hover {
  border-color: #c0c4cc;
}

.select-left {
  display: flex;
  gap: 10px;
}

.left-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-icon .iconfont {
  font-size: 19px;
  color: #909399;
}

.select-value {
  flex: 1;
  display: flex;
  align-items: center;
  color: #606266;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-icon {
  margin-left: 8px;
  transition: transform 0.2s ease;
}

.right-icon.rotate {
  transform: rotate(180deg);
}

.right-icon .iconfont {
  font-size: 12px;
  color: #c0c4cc;
}

.select-options {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  max-height: 300px;
  overflow-y: auto;
}

.select-options ul {
  width: 100%;
  height: auto;
  padding: 6px 0;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: column;
}

.select-options li {
  padding: 8px 16px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  transition: background-color 0.2s ease;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select-options li:hover {
  background-color: #f5f7fa;
  color: #409eff;
}

.select-options li:active {
  background-color: #e6f7ff;
}

.select-options li.selected {
  background-color: #f5f7fa;
  color: #409eff;
  font-weight: 500;
}
</style>