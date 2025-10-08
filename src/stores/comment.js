import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import { useUserInfoStore } from '@/stores/user'
import { commentApi } from "../apis/apis";
import message, { error } from "../utils/message";
import { useAuthStore } from "./auth";

export const useCommentStore = defineStore('comment', () => {

    const userStore = useUserInfoStore()
    const authStore = useAuthStore()

    const appCommentList = ref([])
    const communityCommentList = ref([])

    const commentInputAvatar = computed(() => userStore.userData.avatar)



    const fetchUploadImage = async (type, file) => {
        try {
            const resp = await commentApi.uploadImg(type, file)
            console.log(resp.data);
            return resp.data
        } catch (error) {
            message.error(error.message)
            return false
        }
    }

    const fetchAddComment = async (type, formData) => {
        console.log("评论数据：", type, formData)
        try {
            const resp = await commentApi.addComment(type, formData);
            message.success("评论发布成功！");
            fetchCommentList(type, formData.targetId)
            return resp.data;
        } catch (error) {
            message.error("评论发布失败：" + error.message);
            return false;
        }
    };

    const fetchCommentList = async (type, id) => {
        try {
            const resp = await commentApi.getComment(type, userStore.uid, id)
            console.log("返回的评论数据", type, resp.data);
            if (type === 'app') {
                appCommentList.value = resp.data
            } else if (type === 'community') {
                communityCommentList.value = resp.data
            } else {
                throw new Error("未知评论类型");
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    return {
        appCommentList,
        commentInputAvatar,
        communityCommentList,
        fetchUploadImage,
        fetchAddComment,
        fetchCommentList,
    }

})