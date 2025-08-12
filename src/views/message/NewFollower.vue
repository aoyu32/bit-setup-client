<template>
    <div class="new-follower">
        <MessageList>
            <MessageItem v-for="(item, index) in NewFollowerList" :data="item" :key="index">
                <template #type>
                    <span v-if="item.type === 'follow'">开始关注你了</span>
                </template>
                <template #item-right>
                    <div class="follow-button">
                        <button :class="{ followed: item.isFollowed }">{{ item.isFollowed ? '已关注' : '回关' }}</button>
                    </div>
                </template>
            </MessageItem>
        </MessageList>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import MessageList from '../../components/message/MessageList.vue';
import MessageItem from '../../components/message/MessageItem.vue';
import { NewFollowerList } from '../../utils/message-data';
</script>
<style lang="scss" scoped>
.new-follower {
    :deep(.msg-item) {

        .item-left {
            @include flex(c, c);
        }

        .item-center {
            @include flex(n, c);
        }

        .item-right {
            .img-cover {
                @include wh(50);

                .no-cover {
                    @include wh(50);
                }
            }
        }

    }

    .follow-button {

        button {
            @include b-r($b-r);
            font-size: 13px;
            min-width: 100px;
            padding: 5px 15px;

            @include c-t {
                color: color(c-g0);
                background-color: color(c-s-dark);
            }
        }

        .followed {
            @include c-t {
                color: color(c-g0);
                background-color: color(c-s-light);
            }
        }
    }

}
</style>