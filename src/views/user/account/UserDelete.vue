<template>
    <div class="user-delete">
        <div class="user-delete-top">
            <div class="delete-label">
                <i class="iconfont icon-delete"></i>
                <h3>注销账号</h3>
            </div>
        </div>
        <div class="user-delete-bottom">
            <div class="delete-account">
                <div class="tip">
                    <div class="warning-content">
                        <div class="warning-header">
                            <i class="iconfont icon-warning"></i>
                            <span class="warning-title">注销须知</span>
                        </div>
                        <div class="warning-list">
                            <p>• 账号注销后将无法恢复，请谨慎操作</p>
                            <p>• 注销后您的所有数据将被永久删除</p>
                            <p>• 注销后将无法使用该账号登录</p>
                            <p>• 未使用的权益、积分等将全部清零</p>
                        </div>
                    </div>

                    <div class="confirm-section">
                        <div class="input-group">
                            <label>请输入您的密码以确认注销:</label>
                            <ao-input />
                        </div>

                        <div class="checkbox-group" :class="{ checked: isChecked }" @click="isChecked = !isChecked">
                            <span>
                                <i class="iconfont icon-icon-check-square" v-if="!isChecked"></i>
                                <i class="iconfont icon-check-square1" v-else></i>
                            </span>
                            <span> 我已阅读并同意上述注销条款</span>
                        </div>
                    </div>

                    <div class="action-buttons">
                        <button class="btn-cancel" @click="handleCancel">
                            取消
                        </button>
                        <button class="btn-delete" @click="handleDelete" :disabled="!canDelete">
                            确认注销
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AoInput from '@/components/common/AoInput.vue';
const isChecked = ref(false)

const password = ref('')
const confirmed = ref(false)

const canDelete = computed(() => {
    return password.value.trim() !== '' && confirmed.value
})

const handleCancel = () => {
    // 取消注销操作
    password.value = ''
    confirmed.value = false
    // 这里可以添加路由跳转或其他逻辑
}

const handleDelete = () => {
    if (!canDelete.value) return

    // 这里添加注销账号的API调用逻辑
    console.log('执行账号注销操作')
    // 可以添加确认弹窗
    // 调用注销API
    // 处理注销结果
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/user/_user-delete.scss' as *;
</style>