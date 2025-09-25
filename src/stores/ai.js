import { defineStore } from "pinia";
import { aiApi } from "../apis/apis";
import { ref } from "vue";
import message from "../utils/message";
import { useAuthStore } from "./auth";

export const useAiStore = defineStore('ai', () => {
    const authStore = useAuthStore()

    const currentConversation = ref('')
    const allConversation = ref([])
    const historyMsg = ref([])
    const isNewConversation = ref(false)

    const fetchNewConversation = async () => {
        try {
            const resp = await aiApi.newConversation()
            currentConversation.value = resp.data
            isNewConversation.value = true
            return true  // 返回成功标志
        } catch (error) {
            console.log(error)
            message.error(error.message)
            return false  // 返回失败标志
        }
    }

    const fetchChat = async (data) => {

        const shouldUpdateTitle = isNewConversation.value && historyMsg.value.length === 0
        // 添加用户消息
        historyMsg.value.push({
            role: 'user',
            content: data.content
        })


        const historyMsgIndex = historyMsg.value.length

        // 添加助手消息占位符
        const assistantMessage = {
            role: 'assistant',
            content: ''
        }
        historyMsg.value.push(assistantMessage)


        try {
            const response = await fetch(`http://localhost:8080/api/ai/chat`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authStore.token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                // 直接修改引用的对象，避免索引问题
                historyMsg.value[historyMsgIndex].content += chunk
                console.log("返回数据：", chunk);
            }

            if (shouldUpdateTitle) {
                await fetchConversationTitle(data.conversationId)
                isNewConversation.value = false // 标记为已更新过标题
            }

            return true
        } catch (error) {
            console.error('请求错误:', error);
            // 发生错误时移除添加的消息
            historyMsg.value.pop() // 移除助手消息
            historyMsg.value.pop() // 移除用户消息
            return false
        }

    }

    const fetchMessages = async (conversationId) => {
        try {
            const resp = await aiApi.getMessageByConversationId(conversationId)
            historyMsg.value = resp.data
            isNewConversation.value = false
            console.log("会话历史消息：", resp.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchAllConversation = async () => {
        try {
            const resp = await aiApi.getAllConversation()
            allConversation.value = resp.data
        } catch (error) {
            console.log(error.message);
            message.error(error.message)
        }
    }

    const fetchConversationTitle = async (param) => {
        try {
            const resp = await aiApi.getConversationTitle(param)
            console.log("会话标题：", resp.data);
            allConversation.value[0].title = resp.data
        } catch (error) {
            message.error(error.message)
        }
    }


    return {
        allConversation,
        historyMsg,
        currentConversation,
        isNewConversation,
        fetchChat,
        fetchNewConversation,
        fetchConversationTitle,
        fetchAllConversation,
        fetchMessages
    }

})