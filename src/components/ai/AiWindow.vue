<template>
    <div class="ai-window" :style="{ paddingBottom: isChatIn ? '50px' : '0px' }">
        <div class="window-wrapper">
            <!-- 没有聊天信息 -->
            <div class="no-message" v-if="!isChatIn">
                <div class="ai-logo">
                    <i class="iconfont icon-shejizhinengzhushou"></i>
                </div>
                <div class="ai-greet">
                    <p>{{ greet }}</p>
                </div>
                <!-- <div class="ai-introduce">
                    <p>{{ introduce }}</p>
                </div> -->
            </div>
            <!-- 有聊天消息 -->
            <div class="has-message" v-else>
                <div class="message-wrapper" v-for="(item, index) in messages" :key="index">
                    <AiMessage :message-data="item" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import AiMessage from './AiMessage.vue'
const props = defineProps({
    messages: {
        type: Array,
        default: []
    }
})

const isChatIn = computed(() => {
    return props.messages.length !== 0
})


onMounted((() => {
    console.log("聊天数据:", props.messages);

}))

const greet = ref('你好呀！今天想问些什么？')
const introduce = ref('我可以帮你推荐你想要的应用，解答有关本站的APP各种问题，随时为您服务哦~')

</script>
<style scoped lang="scss">
@use '@/assets/styles/ai/_ai-window.scss' as *;
</style>