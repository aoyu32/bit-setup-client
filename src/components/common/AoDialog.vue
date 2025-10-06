<template>
    <Teleport to="body">
        <Transition name="dialog-fade">
            <div v-if="modelValue" class="ao-dialog-overlay" @click="handleOverlayClick">
                <div class="ao-dialog" :class="size" @click.stop>
                    <div class="ao-dialog-header">
                        <h3 class="ao-dialog-title">{{ title }}</h3>
                        <button class="ao-dialog-close" @click="closeDialog">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div class="ao-dialog-content">
                        <slot></slot>
                    </div>
                    <div v-if="showFooter" class="ao-dialog-footer">
                        <slot name="footer">
                            <button class="ao-btn ao-btn-secondary" @click="closeDialog">取消</button>
                            <button class="ao-btn ao-btn-primary" @click="confirmDialog">确认</button>
                        </slot>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { computed } from 'vue'

// 定义组件属性
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '对话框标题'
    },
    size: {
        type: String,
        default: 'medium',
        validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    showFooter: {
        type: Boolean,
        default: true
    },
    closeOnOverlay: {
        type: Boolean,
        default: true
    }
})

// 定义事件
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

// 关闭对话框
const closeDialog = () => {
    emit('update:modelValue', false)
    emit('cancel')
}

// 确认对话框
const confirmDialog = () => {
    emit('confirm')
    closeDialog()
}

// 点击遮罩层处理
const handleOverlayClick = () => {
    if (props.closeOnOverlay) {
        closeDialog()
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

// 变量定义
$primary-color: #4361ee;
$primary-hover: #3a56d4;
$text-color: #2d3748;
$text-light: #718096;
$border-color: #e2e8f0;
$bg-color: #ffffff;
$overlay-bg: rgba(0, 0, 0, 0.5);
$shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
$border-radius: 12px;
$transition: all 0.3s ease;

// 混合宏
@mixin wh {
    width: 100%;
    height: 100%;
}

@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

// 全局样式重置
* {
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

// 对话框样式
.ao-dialog-overlay {
    @include wh;
    @include flex-center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: $overlay-bg;
    backdrop-filter: blur(2px);
}

.ao-dialog {
    background: $bg-color;
    border-radius: $border-radius;
    box-shadow: $shadow;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    
    &.small {
        width: 400px;
    }
    
    &.medium {
        width: 500px;
    }
    
    &.large {
        width: 600px;
    }
}

.ao-dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px 0;
    margin-bottom: 16px;
}

.ao-dialog-title {
    font-size: 18px;
    font-weight: 600;
    color: $text-color;
    margin: 0;
}

.ao-dialog-close {
    background: none;
    border: none;
    cursor: pointer;
    color: $text-light;
    padding: 4px;
    border-radius: 4px;
    transition: $transition;
    
    &:hover {
        background-color: #f7fafc;
        color: $text-color;
    }
}

.ao-dialog-content {
    padding: 0 24px;
    flex: 1;
    overflow-y: auto;
    color: $text-color;
    line-height: 1.5;
}

.ao-dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 20px 24px;
    border-top: 1px solid $border-color;
    margin-top: 16px;
}

.ao-btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: $transition;
    border: none;
    
    &.ao-btn-primary {
        background-color: $primary-color;
        color: white;
        
        &:hover {
            background-color: $primary-hover;
        }
    }
    
    &.ao-btn-secondary {
        background-color: #f7fafc;
        color: $text-color;
        border: 1px solid $border-color;
        
        &:hover {
            background-color: #edf2f7;
        }
    }
}

// 动画效果
.dialog-fade-enter-active,
.dialog-fade-leave-active {
    transition: $transition;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
    opacity: 0;
    
    .ao-dialog {
        transform: scale(0.9);
        opacity: 0;
    }
}

.dialog-fade-enter-to,
.dialog-fade-leave-from {
    opacity: 1;
    
    .ao-dialog {
        transform: scale(1);
        opacity: 1;
    }
}

// 响应式设计
@media (max-width: 640px) {
    .ao-dialog {
        width: 90vw !important;
        margin: 0 5vw;
    }
    
    .ao-dialog-header,
    .ao-dialog-content,
    .ao-dialog-footer {
        padding-left: 20px;
        padding-right: 20px;
    }
}
</style>