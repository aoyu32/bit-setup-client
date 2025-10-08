import { defineStore } from "pinia";
import { userInfoApi } from "../apis/apis";
import { message } from "@/utils/message";
import { ref, computed } from "vue";

export const useUserInfoStore = defineStore('user-info', () => {
    // 移除 uid 的单独定义，避免重复
    const userData = ref({
        uid: "",
        email: "",
        phone: "",
        role: "",
        nickname: "",
        avatar: "",
        gender: 0,
        registerTime: "",
        bio: "",
        career: "",
        level: 0,
        levelTitle: "",
        isDeveloper: 0,
        experience: 0,
        province: "",
        city: "",
        county: "",
        points: 0,
        postCount: 0,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        followCount: 0,
        fansCount: 0
    });

    // 使用 computed 来获取 uid
    const uid = computed(() => userData.value.uid);

    /**
     * 安全赋值函数
     */
    const assignUserData = (sourceData) => {
        if (!sourceData || typeof sourceData !== 'object') {
            console.warn('assignUserData: 无效的源数据');
            return;
        }

        // 使用 Object.assign 确保响应式更新
        Object.keys(sourceData).forEach(key => {
            if (key in userData.value && sourceData[key] !== undefined) {
                userData.value[key] = sourceData[key];
            }
        });

        console.log('用户信息已更新:', userData.value);
    };

    const fetchBaseInfo = async () => {
        try {
            const resp = await userInfoApi.getBaseInfo();
            assignUserData(resp.data);
            return true;
        } catch (error) {
            message.error(error.message);
            return false;
        }
    };

    const resetUserData = () => {
        // 保持响应式，逐个重置字段
        Object.keys(userData.value).forEach(key => {

            if (typeof userData.value[key] === 'number') {
                userData.value[key] = 0;
            } else {
                userData.value[key] = "";
            }
        });
    };

    const fetchUploadAvatar = async (file) => {
        try {
            const resp = await userInfoApi.uploadAvatar(file, uid.value)
            console.log("返回头像url", resp.data);
            message.success("上传成功")
            return resp.data

        } catch (error) {
            message.error(error.message)
        }
    }

    const fetchUpdateUser = async (userInfo) => {
        try {
            const data = {
                ...userInfo,
                uid: uid.value
            }
            await userInfoApi.updateUserInfo(data)
            message.success("信息修改成功")
            fetchBaseInfo()
        } catch (error) {
            message.error("信息修改失败：" + error.message)
        }
    }

    return {
        userData,
        uid,
        assignUserData,
        fetchBaseInfo,
        resetUserData,
        fetchUploadAvatar,
        fetchUpdateUser
    };
},
    {
        persist: {
            enabled: true,
            strategy: localStorage,
            pick: ['userData.uid']
        }
    }
);