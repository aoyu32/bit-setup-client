<template>
    <div class="comment">
        <div class="comment-input-container">
            <CommentInput />
        </div>
        <div class="comment-item-container">
            <div class="has-comment" v-if="isHasComment">
                <CommentItem />
                <!-- <CommentItem /> -->
                <!-- <CommentItem /> -->
            </div>
            <div class="no-comment" v-else>
                <img :src="noDataImg" alt="">
                <p>暂时没有评论哦~</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import CommentInput from './CommentInput.vue';
import CommentItem from './CommentItem.vue';
import noDataImg from '@/assets/imgs/no-data.svg'
const isHasComment = ref(true)

</script>
<style scoped lang="scss">
.comment {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;


    .comment-input-container {
        margin: 20px 0;
    }

    .no-comment {
        @include wh;
        @include flex(c, c, c);
        gap: 15px;
        color: #333;
        padding: 20px;

        img {
            width: 25%;
            height: 25%;

        }
    }
}
</style>