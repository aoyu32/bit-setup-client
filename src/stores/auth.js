import { defineStore } from "pinia"
import { userAuthApi } from "../apis/apis"
import { useUserInfoStore } from "./user"
import { message } from "@/utils/message"
import { ref, computed } from "vue"


export const useAuthStore = defineStore('user-auth', () => {
    const userStore = useUserInfoStore()
    const token = ref('')

    // 所有方法都返回 boolean，错误已在拦截器中处理
    const fetchRegister = async (param) => {
        try {
            const resp = await userAuthApi.register(param)
            token.value = resp.data.token
            userStore.assignUserData(resp.data)
            message.success("注册成功")
            return true
        } catch (error) {
            return false
        }
    }

    const fetchCaptcha = async (email) => {
        try {
            await userAuthApi.getCaptcha(email)
            message.success("验证码发送成功")
            return true
        } catch (error) {
            return false
        }
    }

    const fetchLogin = async (param) => {
        try {
            const resp = await userAuthApi.login(param)
            userStore.assignUserData(resp.data)
            token.value = resp.data.token
            message.success("登录成功")
            return true
        } catch (error) {
            return false
        }
    }

    const fetchResetPwd = async () => {

    }

    const logout = () => {
        token.value = ''
        userStore.resetUserData()
    }

    const isLogin = computed(() => {
        return token.value !== '' || null
    })

    return {
        isLogin,
        token,
        fetchRegister,
        fetchCaptcha,
        logout,
        fetchLogin
    }
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                paths: ['token']
            }
        ],
    }
})