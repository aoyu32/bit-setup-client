import axios from "axios"
import { message } from "@/utils/message"
import { useAuthStore } from "@/stores/auth"

const service = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 默认不携带 token，只有请求配置了 withToken: true 时才加
        if (config.withToken) {
            const authStore = useAuthStore()
            const token = authStore.token
            console.log("token 值：", token);

            if (token) {
                console.log("token：", token);

                config.headers['Authorization'] = `Bearer ${token}`
            }
        }
        return config
    },
    error => Promise.reject(error)
)
// 统一错误处理 - 所有错误都在这里处理和显示
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code && res.code !== 200) {
            message.error(res.message || '请求失败')
            return Promise.reject(new Error(res.message))
        }
        return res
    },
    error => {
        // 网络错误统一处理
        let errorMessage = '请求失败'
        if (error.code === 'ECONNABORTED') {
            errorMessage = '请求超时'
        } else if (error.response?.status === 401) {
            errorMessage = '登录已过期'
        }

        message.error(errorMessage)
        return Promise.reject(error)
    }
)

export default service