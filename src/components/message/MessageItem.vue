<template>
    <div class="msg-item">
        <div class="item-left">
            <div class="user-avatar">
                <div class="img-wrapper">
                    <img :src="data.avatar" alt="">
                </div>
            </div>
        </div>
        <div class="item-center">
            <div class="item-info">
                <div class="username">
                    {{ data.username }}
                </div>
                <div class="type">
                    <slot name="type" :type="data.type"></slot>
                </div>
                <div class="date">
                    {{ data.date }}
                </div>
            </div>
            <slot name="comment-content"></slot>
            <slot name="reply-to"></slot>
        </div>
        <div class="item-right">
           <slot name="item-right"></slot>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>
<style lang="scss">
@use '@/assets/styles/message/_message-item.scss' as *;
</style>