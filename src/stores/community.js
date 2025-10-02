import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { communityApi } from "../apis/apis";
import message from "../utils/message";
import { useUserInfoStore } from '@/stores/user'

export const useCommunityStore = defineStore("community", () => {
    const userStore = useUserInfoStore()

    // 使用计算属性动态获取 uid
    const currentUid = computed(() => userStore.userData.uid)

    const postFormData = ref({
        // 在模板中使用时通过 currentUid.value 获取
        title: '',
        category: 'topic',
        summary: '',
        isPublish: false,
        content: '',
        images: ['', '']
    })

    const postList = ref([])

    const postDetail = ref({})

    const hotList = ref([])

    const recommendList = ref([])

    const fetchUploadPostImg = async (file) => {
        try {
            // 使用计算属性的值
            const resp = await communityApi.uploadImg(file, currentUid.value)
            console.log("返回图片url:", resp.data);
            return resp.data
        } catch (error) {
            message.error(error.message)
        }
    }

    const fetchSavePost = async (param) => {
        console.log("请求参数：", param);
        try {
            // 过滤 images 中的空字符串
            const filteredImages = param.images ? param.images.filter(img => img && img.trim() !== '') : []

            // 确保参数中包含当前 uid 和过滤后的 images
            const postData = {
                ...param,
                uid: currentUid.value,
                images: filteredImages
            }

            console.log("过滤后的请求参数：", postData);

            const resp = await communityApi.savePost(postData)
            if (param.isPublish) {
                message.success("发布成功")
                //清空表单
                postFormData.value = {
                    title: '',
                    category: 'topic',
                    summary: '',
                    isPublish: false,
                    content: '',
                    images: ['', '']
                }
            } else {
                message.success("草稿已保存")
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    const fetchPostListByCategory = async (category) => {
        try {
            const resp = await communityApi.getPostList(category)
            postList.value = resp.data
            console.log("获取的帖子列表：", resp.data);
        } catch (error) {
            message.error(error.message)
        }
    }

    const fetchPostDetail = async (pid) => {
        try {
            const resp = await communityApi.getPostDetail(pid)
            postDetail.value = resp.data
            console.log("帖子详情数据：", postDetail.value);

        } catch (error) {
            message.error(error.message)
        }
    }

    const fetchHotPost = async () => {
        try {
            const resp = await communityApi.getHotPost()
            hotList.value = resp.data
            console.log("热帖列表", hotList.value);
        } catch (error) {
            message.error(error.message)
        }
    }

    const fetchRecommendPost = async () => {
        try {
            const resp = await communityApi.getRecommend()
            recommendList.value = resp.data
            console.log("推荐帖子列表数据：", recommendList.value);
        } catch (error) {
            message.error(error.message)
        }
    }

    return {
        postFormData,
        postList,
        currentUid, 
        postDetail,
        hotList,
        recommendList,
        fetchUploadPostImg,
        fetchSavePost,
        fetchPostListByCategory,
        fetchPostDetail,
        fetchHotPost,
        fetchRecommendPost
    }
})