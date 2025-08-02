<template>
    <div class="ao-input">
        <input type="text" :placeholder="placeholder">
    </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
    placeholder: {
        type: String,
        default: '请输入内容'
    }
})


</script>
<style lang="scss" scoped>
.ao-input {
    width: 100%;
    height: 100%;

    input {
        /* 基础样式 */
        width: 100%;
        height: 100%;
        padding: 10px 15px;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
        outline: none;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        transition: all 0.3s ease;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        letter-spacing: 0.2px;

        /* 占位符样式 */
        &::placeholder {
            color: #999;
            opacity: 1;
        }

        /* 聚焦状态 */
        &:focus {
            border-color: #4d90fe;
            box-shadow: 0 0 0 3px rgba(77, 144, 254, 0.2);
        }
    }
}
</style>