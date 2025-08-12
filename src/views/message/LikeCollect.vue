<template>
    <div class="like-collect">
        <MessageList>
            <MessageItem v-for="(item, index) in likeCollectList" :data="item" :key="index">
                <template #type>
                    <span v-if="item.type === 'like'">{{ item.comment ? '给你的评论点赞了' : '给你的帖子点赞了' }}</span>
                    <span v-if="item.type === 'collect'">收藏了你的帖子</span>
                </template>
                <template #reply-to>
                    <div class="msg-reply-to" v-if="item.comment">
                        <p>{{ item.comment }}</p>
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
import { likeCollectList } from '../../utils/message-data';

</script>
<style lang="scss" scoped>
.like-collect {
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

    .msg-reply-to {
        font-size: 12px;
        padding: 3px 10px;

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