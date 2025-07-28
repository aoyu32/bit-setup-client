<template>
    <div class="ai" :style="{ height: containerHeight }">
        <div class="ai-left">
            <div class="ai-sidebar-container">
                <AiSidebar @foldSidebar="handleFoldSidebar" @new-chat="handleNewChat" />
            </div>
        </div>
        <div class="ai-right" :style="{ marginLeft: aiRightMargin }" :class="{ 'chat-in': isChatIn }" ref="aiRightRef">
            <div class="ai-window-container">
                <AiWindow :isChatIn="isChatIn" :messageList="aiChatDataRef" />
            </div>
            <div class="ai-input-container">
                <div class="input-wrapper">
                    <AiInput @send-message="handleSendMessage" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AiSidebar from '@/components/ai/AiSidebar.vue';
import AiWindow from '@/components/ai/AiWindow.vue';
import AiInput from '@/components/ai/AiInput.vue';
import aiChatData from '../../utils/ai-data'
const aiChatDataRef = ref(aiChatData)
const isFoldSidebar = ref(true)
const aiRightMargin = computed(() => isFoldSidebar.value ? '250px' : '70px')
const isChatIn = ref(false)
const aiRightRef = ref(null)
const exceedsViewport = ref(false)

// 计算容器高度
const containerHeight = computed(() => {
    return exceedsViewport.value
        ? 'calc(100% - 72px)'
        : 'calc(100vh - 72px)'
})

const handleFoldSidebar = (value) => {
    isFoldSidebar.value = value
}

const handleNewChat = () => {
    isChatIn.value = false
}

const handleSendMessage = (value) => {
    console.log(aiChatDataRef .value);
    
    console.log("收到消息：", value.value);
    aiChatDataRef.value.push({
        role: 'user',
        content: value.value
    },{
        role:'ai',
        content:'**正在开发中！**'
    })
    isChatIn.value = true
}

// 检测内容高度是否超过视口
const checkContentHeight = () => {
    if (!aiRightRef.value) return

    const viewportHeight = window.innerHeight
    const contentHeight = aiRightRef.value.scrollHeight
    exceedsViewport.value = contentHeight > viewportHeight
}

onMounted(() => {
    const observer = new ResizeObserver(checkContentHeight)
    if (aiRightRef.value) {
        observer.observe(aiRightRef.value)
    }

    // 初始检查
    checkContentHeight()

    // 监听窗口变化
    window.addEventListener('resize', checkContentHeight)

    // 保存观察器以便卸载时清理
    aiRightRef.value._resizeObserver = observer
})

onUnmounted(() => {
    if (aiRightRef.value?._resizeObserver) {
        aiRightRef.value._resizeObserver.disconnect()
    }
    window.removeEventListener('resize', checkContentHeight)
})
</script>

<style lang="scss" scoped>
.ai {
    @include flex;
    position: relative;
    @include wh(100p, n);
    /* 高度现在由动态绑定控制 */

    .ai-left {
        @include wh(n, 100p);
        position: fixed;
        z-index: 100;
    }

    .ai-right {
        @include wh(100p, 100p);
        @include flex(c, c, c);
        position: relative;
        margin-left: 250px;
        overflow-y: auto;
        /* 添加滚动条 */

        @include c-t {
            background-color: color(c-g2);
        }

        .ai-window-container {
            @include wh(800, n);
        }

        .ai-input-container {
            @include wh(100p, n);
            margin-bottom: 70px;

            @include c-t {
                background-color: color(c-g2);
            }


            .input-wrapper {
                @include wh(70p, 100p);
                margin: 0 auto;
            }
        }
    }

    .chat-in {
        @include wh(100p, 100p);
        @include flex(c, s-b, c);

        .ai-window-container {
            @include wh(100p, n);
            padding-top: 20px;
            padding-bottom: 140px;
        }

        .ai-input-container {
            @include wh(800, n);
            margin-bottom: 0;
            position: fixed;
            bottom: 0;
            padding-bottom: 20px;
            z-index: 0;


            .input-wrapper {
                @include wh(800, 100p);
                margin: 0 auto;
            }
        }
    }
}
</style>