<template>
    <div class="ai" :style="{ height: containerHeight }" ref="ai">
        <div class="ai-left">
            <div class="ai-sidebar-container">
                <AiSidebar @foldSidebar="handleFoldSidebar" @new-chat="handleNewChat" :history="aiStore.allConversation"
                    @conversation-change="handleConversationChange" />
            </div>
        </div>
        <div class="ai-right" :style="{ marginLeft: aiRightMargin }" :class="{ 'chat-in': messagesList.length !== 0 }"
            ref="aiRightRef">
            <div class="ai-window-container">
                <AiWindow :messages="messagesList" ref="aiWindowRef" />
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
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import AiSidebar from '@/components/ai/AiSidebar.vue';
import AiWindow from '@/components/ai/AiWindow.vue';
import AiInput from '@/components/ai/AiInput.vue';
import { scrollTo } from '@/utils/scroll';
import { useAiStore } from '@/stores/ai';
import { useUserInfoStore } from '../../stores/user';
import { useRouter, useRoute } from 'vue-router';

const userStore = useUserInfoStore()
const router = useRouter()
const route = useRoute()
const aiStore = useAiStore()
const aiWindowRef = ref(null)
const isFoldSidebar = ref(true)
const aiRightMargin = computed(() => isFoldSidebar.value ? '250px' : '70px')
const isChatIn = ref(false)
const aiRightRef = ref(null)
const aiRef = ref(null)
const exceedsViewport = ref(false)
const isNewChat = ref(false)
// 计算容器高度
const containerHeight = computed(() => {
    return exceedsViewport.value
        ? 'calc(100% - 72px)'
        : 'calc(100vh - 72px)'
})

const messagesList = computed(() => {
    return aiStore.historyMsg
})

const handleFoldSidebar = (value) => {
    isFoldSidebar.value = value
}


//切换聊天会话事件
const handleConversationChange = (conversationId) => {
    router.push(`/ai/chat/${conversationId}`)
}

//创建新聊天事件
const handleNewChat = () => {
    router.push(`/ai/chat`)
}

// 监听路由变化
watch(() => route.params.id, (newId, oldId) => {
    if (newId) {
        // 有ID表示切换到现有对话
        if (newId !== aiStore.currentConversation) {
            // 只有当会话ID真的改变时才重新获取消息
            aiStore.currentConversation = newId
            aiStore.fetchMessages(newId)
        }
    } else {
        // 没有ID表示新对话
        // 只有从有ID的路由跳转到无ID路由时才清空
        if (oldId) {
            aiStore.currentConversation = ''
            aiStore.historyMsg = []
        }
    }
}, { immediate: true })

//发送聊天事件
//发送聊天事件
const handleSendMessage = async (value) => {
    let conversationId = aiStore.currentConversation
    scrollTo('bottom', 150)

    // 如果是新对话，先创建会话
    if (!conversationId) {
        const success = await aiStore.fetchNewConversation()
        if (success) {
            conversationId = aiStore.currentConversation
            // 刷新会话列表
            setTimeout(() => {
                aiStore.fetchAllConversation()
            }, 100)
        } else {
            // 创建会话失败，不发送消息
            message.error('创建新会话失败')
            return
        }
    }

    const data = {
        uid: userStore.userData.uid,
        conversationId: conversationId, // 使用确保有值的conversationId
        content: value
    }


    const resp = await aiStore.fetchChat(data)
    if (resp) {
        //请求获取聊天标题
        // 发送成功后再更新路由（如果需要）
        if (route.params.id !== conversationId) {
            router.push(`/ai/chat/${conversationId}`)
        }
    }
}

// 检测内容高度是否超过视口
const checkContentHeight = () => {
    if (!aiRightRef.value) return
    const viewportHeight = window.innerHeight
    const contentHeight = aiRightRef.value.scrollHeight
    exceedsViewport.value = contentHeight > viewportHeight
}

watch(() => aiStore.historyMsg, () => {
    nextTick(() => {
        scrollTo('bottom', 150)
    })
}, { deep: true })

onMounted(() => {


    //组件挂载时请求用户的所有会话
    aiStore.fetchAllConversation()

    if (aiStore.currentConversation) {
        router.push(`/ai/chat/${aiStore.currentConversation}`)
        // aiStore.fetchMessages(aiStore.currentConversation)
    }

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
    overflow: auto;

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
        /* 添加滚动条 */


        @include c-t {
            // background-color: color(c-g2);
        }

        .ai-window-container {
            @include wh(800, n);
        }

        .ai-input-container {
            @include wh(100p, n);
            margin-bottom: 70px;

            @include c-t {
                background-color: color(c-g1);
            }


            .input-wrapper {
                @include wh(800px, 100p);
                margin: 0 auto;
            }
        }
    }

    .chat-in {
        @include wh(100p, 100p);
        @include flex(c, s-b, c);

        .ai-window-container {
            @include wh(100p, n);
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

@media (max-width:1100px) {
    .ai-left {
        display: none;
    }

    .ai {
        .ai-right {
            margin-left: 0 !important;

            .ai-input-container {

                .input-wrapper {
                    @include wh(600px, 100p);
                    margin: 0 auto;
                }
            }
        }
    }


}
</style>