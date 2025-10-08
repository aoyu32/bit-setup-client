<template>
    <div class="comment">
        <div class="comment-input-container">
            <CommentInput v-model="commentForm.content" @submit="handleSubmit" :avatar="commentStore.commentInputAvatar"
                ref="commentInputRef" />
        </div>
        <div class="comment-item-container">
            <div class="has-comment" v-if="commentList.length > 0">
                <CommentItem v-for="item in commentList" :key="item.cid" :commentData="item" />
            </div>
            <div class="no-comment" v-else>
                <img :src="noDataImg" alt="">
                <p>暂时没有评论哦~</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, provide } from 'vue'
import CommentInput from './CommentInput.vue';
import CommentItem from './CommentItem.vue';
import noDataImg from '@/assets/imgs/no-data.svg'
import { useCommentStore } from '../../stores/comment';
import message from '../../utils/message'
const onSubmit = inject('onSubmit')
const props = defineProps({
    commentList: {
        type: Array,
        default: []
    }
})

const commentStore = useCommentStore()
const commentInputRef = ref(null)

const commentForm = ref({
    content: '',
    imageUrls: [],
    parentId: null,
    replyUid: null,
    rootId: null
})

// ===== 新增:管理全局回复状态 =====
const activeReplyId = ref(null)

const setActiveReply = (commentId) => {
    activeReplyId.value = commentId
}

const clearActiveReply = () => {
    activeReplyId.value = null
}

// 提供给子组件使用
provide('activeReplyId', activeReplyId)
provide('setActiveReply', setActiveReply)
provide('clearActiveReply', clearActiveReply)

const emit = defineEmits(['submit'])

// === 提交评论 ===
const handleSubmit = async (data) => {
    // 验证评论内容
    const isContentEmpty = !commentForm.value.content.trim()
    const isImagesEmpty = data.images.length === 0

    if (isContentEmpty && isImagesEmpty) {
        message.warn("评论内容不能为空呀！")
        return
    }
    commentForm.value.imageUrls = data.images
    const resp = await onSubmit(commentForm.value)
    if (resp) {
        clearForm()
    }
}

const clearForm = () => {
    commentForm.value = {
        content: '',
        imageUrls: [],
        parentId: null,
        replyUid: null,
        rootId: null
    }
    commentInputRef.value.clearImage()
}

defineExpose({
    clearForm
})
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
            width: 15%;
            height: 15%;
        }
    }
}
</style>