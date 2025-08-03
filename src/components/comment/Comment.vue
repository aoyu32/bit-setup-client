<template>
    <div class="comment">
        <div class="comment-input-container">
            <CommentInput />
        </div>
        <div class="comment-item-container">
            <CommentItem />
            <CommentItem />
        </div>
    </div>
</template>
<script setup>
import CommentInput from './CommentInput.vue';
import CommentItem from './CommentItem.vue';

</script>
<style scoped lang="scss">
.comment{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .comment-input-container{
        margin: 20px 0;
    }
}
</style>