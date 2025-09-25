<template>
    <div class="ai-message">
        <div class="user-ask" v-if="messageData.role === 'user'">
            <div class="message-content">
                {{ messageData.content }}
            </div>
        </div>
        <div class="ai-answer" v-if="messageData.role === 'assistant'">
            <div class="message-content" v-if="messageData.content">
                <AoMarkdwon :markdownData="messageData.content" />
            </div>
            <div class="loadding-container" v-else>
                <AoLoadding text="BIT BOOT正在思考中" customColor="#e05555" :showDots="true" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import AoMarkdwon from '../common/AoMarkdwon.vue';
import AoLoadding from '../../components/common/AoLoadding.vue';
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
onMounted(()=>{
    console.log("渲染聊天消息：",props.messageData);
    
})

</script>
<style lang="scss" scoped>
@use '@/assets/styles/ai/_ai-message.scss' as *;
</style>