<template>
    <div class="system-message">
        <MessageList>
            <div class="sys-msg-item" v-for="(item, index) in systemMessageList">
                <div class="msg-header">
                    <div class="msg-type">
                        {{ item.type }}
                    </div>
                    <div class="msg-date">
                        {{ item.date }}
                    </div>
                </div>
                <div class="msg-main">
                    <AoMarkdwon :markdownData="item.content" />
                </div>
            </div>
        </MessageList>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoMarkdwon from '@/components/common/AoMarkdwon.vue';
import MessageList from '../../components/message/MessageList.vue';
import { systemMessageList } from '../../utils/message-data';
</script>
<style lang="scss" scoped>
.system-message {
    .sys-msg-item {
        @include flex(n, n, c);
        padding: 15px;

        @include c-t {
            background-color: color(c-g0);

        }

        gap: 20px;
    }

    .msg-header {
        @include flex(c, s-b);
    }

    .msg-type {
        font-size: 16px;
        font-weight: 550;
        @include c-t {
            color: color(c-p);
        }
    }

    .msg-date {
        font-size: 14px;

        @include c-t {
            color: color(c-g9, 0.5);
        }
    }
}
</style>