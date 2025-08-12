<template>
    <div class="comment-reply">
        <MessageList>
            <MessageItem v-for="(item, index) in commentReplyList" :data="item" :key="index">
                <template #type>
                    <span v-if="item.type === 'comment'">评论了你的帖子</span>
                    <span v-if="item.type === 'reply'">回复了你的帖子</span>
                </template>
                <template #comment-content>
                    <div class="msg-comment">
                        <p>：{{ item.comment }}</p>
                    </div>
                </template>
                <template #reply-to>
                    <div class="msg-reply-to" v-if="item.replyTo">
                        <p>{{ item.replyTo }}</p>
                    </div>
                </template>
                <template #item-right>
                    <div class="post-info">
                        <div class="post-title">{{ item.post.title }}</div>

                    </div>
                    <div class="post-cover">
                        <div class="img-cover">
                            <img :src="item.post.cover" alt="" v-if="item.post.cover">
                            <div class="no-cover" v-else></div>
                        </div>
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
import { commentReplyList } from '../../utils/message-data';


</script>
<style lang="scss" scoped>
.comment-reply {
    @include wh;

    .msg-comment {
        font-size: 14px;
        max-width: 400px;

        p {
            @include t-e;
        }

        @include c-t {
            color: color(c-g9, 0.7);
        }
    }

    .msg-reply-to {
        font-size: 12px;
        padding: 3px 10px;
        max-width: 400px;

        p {
            @include t-e;
        }

        @include c-t {
            background-color: color(c-g9, 0.1);
            color: color(c-g9, 0.7);
            border-left: 2px solid color(c-g9, 0.2);
        }
    }

    .post-info {
        @include flex(n, n, c);
        font-size: 13px;

        .post-title {
            max-width: 350px;
            @include t-e;
        }
    }

    .post-cover {
        .img-cover {
            @include wh(70);


            .no-cover {
                @include wh(70);
                @include b-r($b-r);

                @include c-t {
                    background-color: color(c-g2);
                }
            }

        }

        @include img($b-r);
    }
}
</style>