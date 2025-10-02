import { defineStore } from "pinia";
import { userInfoApi } from "../apis/apis";
import { message } from "@/utils/message";
import { ref } from "vue";

export const useUserInfoStore = defineStore('user-info', () => {
    const userData = ref({
        uid: "",
        email: "",
        phone: "",
        role: "",
        nickname: "",
        avatar: "",
        gender: 0,
        registerTime: "",
        accessIp: "",
        lastLoginTime: "",
        bio: "",
        occupation: "",
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


    const uid = ref(userData.value.uid)

    /**
     * 安全赋值函数 - 只更新后端返回的字段，保持其他字段不变
     * @param {Object} sourceData 后端返回的数据
     */
    const assignUserData = (sourceData) => {
        if (!sourceData || typeof sourceData !== 'object') {
            console.warn('assignUserData: 无效的源数据');
            return;
        }

        // 创建目标对象的键列表
        const targetKeys = Object.keys(userData.value);

        // 只更新后端返回的且存在于userData中的字段
        Object.keys(sourceData).forEach(key => {
            if (targetKeys.includes(key) && sourceData[key] !== undefined) {
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

    /**
     * 重置用户信息到默认值
     */
    const resetUserData = () => {
        userData.value = {
            uid: "",
            email: "",
            phone: "",
            role: "",
            nickname: "",
            avatar: "",
            gender: 0,
            lastLoginTime: "",
            accessIp: "",
            registerTime: "",
            bio: "",
            occupation: "",
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
        };
    };

    return {
        userData,
        uid,
        assignUserData,
        fetchBaseInfo,
        resetUserData
    };
}

);