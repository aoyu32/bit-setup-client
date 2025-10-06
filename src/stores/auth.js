import { defineStore } from "pinia"
import { userAuthApi } from "../apis/apis"
import { useUserInfoStore } from "./user"
import { message } from "@/utils/message"
import { ref, computed } from "vue"


export const useAuthStore = defineStore('user-auth', () => {
    const userStore = useUserInfoStore()
    const token = ref('')
    const loginRecord = ref({
        previousLogin: {
            browser: '',
            loginIp: '',
            ipProvince: '',
            ipCity: '',
            loginTime: ''
        },
        currentLogin: {
            browser: '',
            loginIp: '',
            ipProvince: '',
            ipCity: '',
            loginTime: ''
        }
    })

    // 所有方法都返回 boolean，错误已在拦截器中处理
    const fetchRegister = async (param) => {
        try {
            const resp = await userAuthApi.register(param)
            token.value = resp.data.token
            userStore.assignUserData(resp.data)
            console.log("注册成功返回", resp.data);
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
            message.error(error.message)
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
            message.error(error.message)
            return false
        }
    }

    const fetchResetPwd = async (param) => {
        try {
            await userAuthApi.reset(param)
            message.success("重置成功，请登录")
            return true
        } catch (error) {
            message.error(error.message)
            return false
        }
    }

    const fetchLoginRecord = async () => {
        try {
            console.log("用户id", userStore.uid);

            const resp = await userAuthApi.loginRecord(userStore.userData.uid)
            if (resp.data) {
                loginRecord.value = {
                    previousLogin: resp.data.previousLogin,
                    currentLogin: resp.data.currentLogin
                }
            }
            console.log("获取的登录记录信息", loginRecord.value);
        } catch (error) {
            message.error(error.message)
        }
    }

    const fetchUpdateEmail = async (param) => {
        try {
            const resp = await userAuthApi.updateEmail(param)
            message.success("修改绑定邮箱成功")
            await userStore.fetchBaseInfo()
        } catch (error) {
            message.error(error.message)
        }
    }

    const fetchUpdatePassword = async (param) => {
        try {
            const resp = await userAuthApi.updatePassword(param)
            message.success("修改密码成功,请重新登录")
            await userStore.fetchBaseInfo()

            return true
        } catch (error) {
            message.error(error.message)
            return false
        }
    }

    const fetchDeleteAccount = async (param) => {
        try {
            const resp = await userAuthApi.deleteAccount(param)
            message.success("已注销账号")
            return true

        } catch (error) {
            message.error(error.message)
            return false
        }
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
        loginRecord,
        fetchRegister,
        fetchCaptcha,
        logout,
        fetchLogin,
        fetchLoginRecord,
        fetchResetPwd,
        fetchDeleteAccount,
        fetchUpdateEmail,
        fetchUpdatePassword

    }
}, {
    persist: {
        enabled: true,
        strategy: localStorage,
        pick: ['token']
    }
}) 