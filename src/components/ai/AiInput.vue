<template>
    <div class="ai-input">
        <div class="input-top">
            <textarea placeholder="给Bit Boot发送信息" ref="textareaRef" @input="handleTextInput"
                v-model="inputValue"></textarea>
        </div>
        <div class="input-bottom">
            <div class="left-button">
                <i class="iconfont icon-lianjie"></i>
            </div>
            <div class="send-button" @click="handleSendMessage">
                <i class="iconfont icon-up"></i>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const textareaRef = ref(null)
const inputValue = ref('');
const emit = defineEmits(['send-message'])
//输入框输入
const handleTextInput = (event) => {
    adjustHeight(event.target.value)

}
//调整输入框的高度的函数
const adjustHeight = (value) => {
    if (value === '') {
        textareaRef.value.style.height = '48px';
    } else {
        textareaRef.value.style.height = '48px';
    }

    // 重置高度，并根据内容调整高度
    textareaRef.value.style.height = 'auto';
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;

    // 控制是否显示滚动条
    textareaRef.value.style.overflowY = textareaRef.value.scrollHeight > textareaRef.value.clientHeight ? 'auto' : 'hidden';
}

//重置高度
const resetHeight = () => {
    textareaRef.value.style.height = '48px';
    inputValue.value = ''
}

const handleSendMessage = () => {
    if (!inputValue.value.trim()) {
        return
    }
    emit('send-message', inputValue)
    console.log("发送消息：", inputValue.value);
    resetHeight()
}

</script>
<style scoped lang="scss">
@use '@/assets/styles/ai/_ai-input.scss' as *;
</style>