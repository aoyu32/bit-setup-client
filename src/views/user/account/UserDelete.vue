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
                            <ao-input type="password" placeholder="请输入密码" v-model="password" :rules="passwordRules"
                                ref="passwordInputRef" />
                        </div>

                        <div class="checkbox-group" :class="{ checked: isChecked }" @click="isChecked = !isChecked">
                            <span>
                                <i class="iconfont icon-icon-check-square" v-if="!isChecked"></i>
                                <i class="iconfont icon-check-square1" v-else></i>
                            </span>
                            <span> 我已阅读并同意上述注销条款</span>
                        </div>
                    </div>
                    <AoDialog v-model="showDialog" title="退出登录" size="medium" @confirm="handleConfirm">
                        <p>{{ dialogContent }}</p>
                    </AoDialog>
                    <div class="action-buttons">
                        <button class="btn-delete" @click="showDialog = true" :disabled="!canDelete">
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
import { message } from '@/utils/message'
import AoInput from '@/components/common/AoInput.vue';
import { useAuthStore } from '../../../stores/auth';
import { useUserInfoStore } from '../../../stores/user';
import AoDialog from '@/components/common/AoDialog.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const authStore = useAuthStore()
const userStore = useUserInfoStore()

const isChecked = ref(false)
const password = ref('')
const passwordInputRef = ref(null)
const showDialog = ref(false)
const dialogContent = ref("确定要注销账号吗，此操作不可逆！")

// 密码验证规则
const validatePassword = (value) => {
    if (!value) return '密码不能为空'
    const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{1,16}$/
    return passRegex.test(value) ? true : '密码需为1-16位数字和字母组合'
}

const passwordRules = [
    { validator: validatePassword, trigger: 'input' },
]

// 是否可以注销
const canDelete = computed(() => {
    return password.value.trim() !== '' && isChecked.value
})

// 执行注销操作
const handleConfirm = async () => {
    if (!canDelete.value) return

    // 验证密码格式
    const isValid = passwordInputRef.value?.validate()
    if (!isValid) {
        message.error('请填写正确的密码格式')
        return
    }

    try {
        // 组装请求参数
        const deleteParam = {
            uid: userStore.userData.uid, // 从用户信息中获取uid
            password: password.value,
            agreements: isChecked.value
        }

        // 调用注销API
        const resp = await authStore.fetchDeleteAccount(deleteParam)

        if (resp) {
            // 清空表单
            password.value = ''
            isChecked.value = false
            setTimeout(() => {
                router.push('/home')
                authStore.logout()
            }, 1500)
        }




    } catch (error) {
        // 错误已在 store 中处理，这里可以添加额外的错误处理逻辑
        console.error('账号注销失败:', error)
    }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/user/_user-delete.scss' as *;
</style>