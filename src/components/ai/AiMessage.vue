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


</script>
<style lang="scss" scoped>
@use '@/assets/styles/ai/_ai-message.scss' as *;
</style>