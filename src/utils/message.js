// src/utils/message.js
import { createApp } from 'vue'
import AoMessage from '@/components/common/AoMessage.vue'

let messageInstance = null
let container = null

const createInstance = () => {
    if (!messageInstance) {
        // 创建容器
        container = document.createElement('div')
        container.className = 'message-container'
        document.body.appendChild(container)
        
        // 创建实例
        const app = createApp(AoMessage)
        messageInstance = app.mount(container)
    }
    return messageInstance
}

// 导出消息方法
export const message = {
    success(text) {
        createInstance().success(text)
    },
    warn(text) {
        createInstance().warn(text)
    },
    error(text) {
        createInstance().error(text)
    }
}

// 也可以单独导出每个方法（可选）
export const success = (text) => message.success(text)
export const warn = (text) => message.warn(text)
export const error = (text) => message.error(text)

// 默认导出
export default message