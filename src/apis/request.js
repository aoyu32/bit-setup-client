import axios from "axios";

const service = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code && res.code !== 200) {
            return Promise.reject(new Error(res.message || '请求出错'))
        } else {
            return res
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default service