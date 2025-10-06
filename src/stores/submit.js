import { defineStore } from "pinia";
import { submitApi } from "../apis/apis";
import { message } from "@/utils/message";
import { ref, computed } from "vue";

export const useSubmitStore = defineStore('submit', () => {

    // ------------------ 状态 ------------------
    const draftData = ref(null);   // 暂存的投稿表单
    const recommendForm = ref({}); // 推荐投稿表单数据
    const developForm = ref({});   // 个人开发投稿表单数据

    // ------------------ 上传截图 ------------------
    const fetchUploadImg = async (file) => {
        try {
            const resp = await submitApi.uploadImg(file);
            console.log("上传图片返回:", resp.data);
            message.success("截图上传成功");
            return resp.data;
        } catch (error) {
            console.error("上传截图失败：", error);
            message.error("上传失败：" + (error.message || "未知错误"));
            return '';
        }
    };

    // ------------------ 上传应用文件 ------------------
    const fetchUploadFile = async (file) => {
        try {
            console.log("上传的文件",file);
            
            const resp = await submitApi.uploadFile(file);
            console.log("上传文件返回:", resp.data);
            message.success("文件上传成功");
            return resp.data;
        } catch (error) {
            console.error("上传文件失败：", error);
            message.error("文件上传失败：" + (error.message || "未知错误"));
            return '';
        }
    };

    // ------------------ 提交推荐应用 ------------------
    const fetchSubmitRecommend = async (formData) => {
        try {
            await submitApi.submitRecommend(formData);
            message.success("推荐应用提交成功！");
            console.log("推荐投稿提交数据:", formData);
            return true
        } catch (error) {
            console.error("提交推荐应用失败：", error);
            message.error("提交失败：" + (error.message || "未知错误"));
            return false
        }
    };

    // ------------------ 提交个人开发应用 ------------------
    const fetchSubmitDevelop = async (formData) => {
        try {
            await submitApi.submitDevelop(formData);
            message.success("个人开发应用提交成功！");
            console.log("开发投稿提交数据:", formData);
            return true
        } catch (error) {
            console.error("提交开发应用失败：", error);
            message.error("提交失败：" + (error.message || "未知错误"));
            return false
        }
    };

    // ------------------ 获取暂存的投稿表单 ------------------
    const fetchSubmitDraft = async (type) => {
        try {
            const resp = await submitApi.getSubmitDraft(type);
            draftData.value = resp.data;
            console.log("获取暂存表单:", resp.data);
            // message.success("已加载暂存的投稿表单");
            return resp.data;
        } catch (error) {
            return null;
        }
    };

    // ------------------ 计算属性 ------------------
    const hasDraft = computed(() => !!draftData.value);

    // ------------------ 导出 ------------------
    return {
        // state
        draftData,
        recommendForm,
        developForm,
        hasDraft,

        // actions
        fetchUploadImg,
        fetchUploadFile,
        fetchSubmitRecommend,
        fetchSubmitDevelop,
        fetchSubmitDraft
    };
});
