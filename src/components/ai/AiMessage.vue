<template>
    <div class="ai-message">
        <div class="user-ask" v-if="messageData.role === 'user'">
            <div class="message-content">
                {{ parseMessage }}
            </div>
        </div>
        <div class="ai-answer" v-if="messageData.role === 'ai'">
            <div class="message-content">
                <AoMarkdwon :markdownData="parseMessage"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked';
import AoMarkdwon from '../common/AoMarkdwon.vue';
const props = defineProps({
    messageData: {
        type: Object,
        default: () => {
            return {
                role: 'user',
                content: ''
            }
        }
    }
})

const parseMessage = computed(() => {
    const message = props.messageData
    if (message.role === 'user') {
        return props.messageData.content
    }
    if (message.role === 'ai') {
        return marked.parse(message.content)
    }
})


</script>
<style lang="scss" scoped>
@use '@/assets/styles/ai/_ai-message.scss' as *;
</style>