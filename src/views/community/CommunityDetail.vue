<template>
    <div class="community-detail">
        <div class="detail-left">
            <div class="detail-content">
                <div class="post-content-container">
                    <PostContent />
                </div>
            </div>
            <div class="post-comment">
                <div class="post-comment-header">
                    <div class="comment-lable">
                        <span>评论</span>
                    </div>
                    <div class="comment-order">
                        <button>最新</button>
                        <button>最热</button>
                    </div>
                </div>
                <div class="comment-container">
                    <Comment />
                </div>
            </div>
        </div>
        <div class="detail-right">

        </div>
    </div>
</template>
<script setup>
import PostContent from '@/components/community/detail/PostContent.vue';
import Comment from '@/components/comment/Comment.vue';


</script>
<style lang="scss" scoped>
.community-detail {
    @include wh(100p, 100p);
    @include flex;
    margin-top: 20px;
    gap: 20px;

    .detail-left {
        @include wh(70p, 100p);
    }

    .detail-right {
        @include wh(30p, 100p);
    }


    .post-comment {
        margin-top: 20px;
        padding: 20px;
        @include flex(n, n, c);
        @include wh(100p, n);

        @include c-t {
            background-color: color(c-g);
        }

        .post-comment-header {
            @include wh(100p, 100p);
            @include flex(n, s-b);

            .comment-order {
                @include flex;
                font-size: 14px;
                gap: 15px;

                button {
                    transition: color 0.2s ease-in;
                    @include c-t {
                        color: color(c-g9, 0.5);
                    }

                    &:hover{
                        @include c-t{
                            color: color(c-p-lighter);
                        }
                    }
                }
            }
        }

    }

}
</style>