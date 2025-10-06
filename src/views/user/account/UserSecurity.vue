<template>
    <div class="user-security">
        <div class="user-security-top">
            <div class="security-label">
                <i class="iconfont icon-lightning"></i>
                <h3>账号安全</h3>
            </div>
        </div>
        <div class="user-security-bottom">
            <div class="login-info">
                <div class="login-info-label">
                    <i class="iconfont icon-asset-monitor"></i>
                    <h4>登录信息</h4>
                </div>
                <div class="login-username info-items">
                    <div class="info-label">
                        <span>登录客户端：</span>
                    </div>
                    <div class="username">
                        <span>{{ currentLogin.browser }}</span>
                    </div>
                </div>
                <div class="last-login info-items">
                    <div class="last-ip item">
                        <div class="info-label">
                            <span>上一次登录IP：</span>
                        </div>
                        <div class="ip">
                            <span>{{ previousLogin.loginIp }}</span>
                        </div>
                        <div class="ip-area">
                            <span>{{ previousLogin.ipProvince + previousLogin.ipCity }}</span>
                        </div>
                    </div>
                    <div class="last-login-time item">
                        <div class="info-label">
                            <span>上一次登录时间：</span>
                        </div>
                        <div class="date">
                            <span>{{ previousLogin.loginTime }}</span>
                        </div>
                    </div>

                </div>
                <div class="current-login info-items">
                    <div class="current-ip item">
                        <div class="info-label">
                            <span>本次登录IP：</span>
                        </div>
                        <div class="ip">
                            <span>{{ currentLogin.loginIp }}</span>
                        </div>
                        <div class="ip-area">
                            <span>{{ currentLogin.ipProvince + currentLogin.ipCity }}</span>
                        </div>
                    </div>
                    <div class="current-login-time item">
                        <div class="info-label">
                            <span>本次登录时间：</span>
                        </div>
                        <div class="date">
                            <span>{{ currentLogin.loginTime }}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div class="email-binding">
                <div class="email-binding-label">
                    <i class="iconfont icon-mail"></i>
                    <h4>邮箱绑定</h4>
                </div>
                <div class="email-info">
                    <div class="binding" v-if="isShowEmailForm">
                        <div class="info-label">
                            <span>修改邮箱：</span>
                        </div>
                        <div class="binding-form">
                            <div class="email-input">
                                <ao-input placeholder="新邮箱地址" v-model="emailForm.email" :rules="emailRules.email"
                                    ref="emailInputRef">
                                    <template #icon>
                                        <i class="iconfont icon-mail"></i>
                                    </template>
                                </ao-input>
                            </div>
                            <div class="vcode-input-wrapper">
                                <div class="vcode-input">
                                    <ao-input placeholder="验证码" v-model="emailForm.code" :rules="emailRules.code"
                                        ref="emailCodeInputRef">
                                        <template #icon>
                                            <i class="iconfont icon-yanzhengma1"></i>
                                        </template>
                                    </ao-input>
                                </div>
                                <div class="vcode-btn">
                                    <AoTimeButton text="获取验证码" :countdown="60" @click="handleSendEmailCode"
                                        :disabled="!isEmailValid" ref="codeButtonRef" />
                                </div>
                            </div>
                            <div class="submit-binding">
                                <button class="cancel-binding" @click="handleCancelEmailBinding">取消</button>
                                <button class="confirm-binding" @click="handleEmailBinding">绑定</button>
                            </div>
                        </div>
                    </div>
                    <div class="has-bound item" v-else>
                        <div class="info-label">
                            <span>绑定邮箱：</span>
                        </div>
                        <div class="email">
                            <span>{{ userStore.userData.email }}</span>
                        </div>
                        <div class="change-binding">
                            <button @click="isShowEmailForm = true">换绑</button>
                        </div>
                    </div>
                </div>

            </div>
            <div class="change-password">
                <div class="change-password-label">
                    <i class="iconfont icon-key"></i>
                    <h4>修改密码</h4>
                </div>
                <div class="password-form">
                    <div class="pwd-input-wrapper">
                        <div class="original-pwd input-item">
                            <ao-input type="password" placeholder="原密码" v-model="passwordForm.originalPassword"
                                :rules="passwordRules.originalPassword" ref="originalPwdInputRef">

                                <template #icon>
                                    <i class="iconfont icon-jiesuo"></i>
                                </template>
                            </ao-input>
                        </div>
                        <div class="new-pwd input-item">
                            <ao-input type="password" placeholder="新密码" v-model="passwordForm.newPassword"
                                :rules="passwordRules.newPassword" ref="newPwdInputRef">
                                <template #icon>
                                    <i class="iconfont icon-key"></i>
                                </template>
                            </ao-input>
                        </div>
                        <div class="confirm-pwd input-item">
                            <ao-input type="password" placeholder="确认新密码" v-model="passwordForm.confirmPassword"
                                :rules="passwordRules.confirmPassword" ref="confirmPwdInputRef">
                                <template #icon>
                                    <i class="iconfont icon-lock"></i>
                                </template>
                            </ao-input>
                        </div>
                    </div>
                    <div class="submit-btn">
                        <button @click="handlePasswordChange">确认修改</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue'
import AoInput from '@/components/common/AoInput.vue';
import { useAuthStore } from '../../../stores/auth';
import { useUserInfoStore } from '../../../stores/user';
import AoTimeButton from '../../../components/common/AoTimeButton.vue';
import { message } from '@/utils/message';
import { useRouter } from 'vue-router';
const authStore = useAuthStore()
const userStore = useUserInfoStore()
const isShowEmailForm = ref(false)
const router = useRouter()


// 邮箱绑定表单
const emailForm = reactive({
    email: '',
    code: ''
})

// 修改密码表单
const passwordForm = reactive({
    originalPassword: '',
    newPassword: '',
    confirmPassword: ''
})

// 引用输入框组件实例
const emailInputRef = ref(null)
const emailCodeInputRef = ref(null)
const originalPwdInputRef = ref(null)
const newPwdInputRef = ref(null)
const confirmPwdInputRef = ref(null)
const codeButtonRef = ref(null)

// 计算属性
const previousLogin = computed(() => authStore.loginRecord.previousLogin)
const currentLogin = computed(() => authStore.loginRecord.currentLogin)

// 邮箱验证
const validateEmail = (value) => {
    if (!value) return '邮箱不能为空'
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(value) ? true : '请输入有效的邮箱地址'
}

// 验证码验证
const validateCode = (value) => {
    if (!value) return '验证码不能为空'
    const codeRegex = /^\d{6}$/
    return codeRegex.test(value) ? true : '验证码必须为6位数字'
}

// 密码验证
const validatePassword = (value) => {
    if (!value) return '密码不能为空'
    const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{1,16}$/
    return passRegex.test(value) ? true : '密码需为1-16位数字和字母组合'
}

// 确认密码验证
const validateConfirmPassword = (value) => {
    if (!value) return '确认密码不能为空'
    return value === passwordForm.newPassword ? true : '两次密码输入不一致'
}

// 邮箱表单校验规则
const emailRules = {
    email: [
        { validator: validateEmail, trigger: 'input' },
    ],
    code: [
        { validator: validateCode, trigger: 'input' },
    ]
}

// 密码表单校验规则
const passwordRules = {
    originalPassword: [
        { validator: validatePassword, trigger: 'input' },
    ],
    newPassword: [
        { validator: validatePassword, trigger: 'input' },
    ],
    confirmPassword: [
        { validator: validateConfirmPassword, trigger: 'input' },
    ]
}

// 邮箱是否有效
const isEmailValid = ref(false)

// 监听邮箱变化
watch(() => emailForm.email, (newValue) => {
    const validationResult = validateEmail(newValue)
    isEmailValid.value = validationResult === true
})

// 发送验证码
const handleSendEmailCode = async () => {
    if (!isEmailValid.value) {
        message.error('请输入有效的邮箱地址')
        return
    }

    const success = await authStore.fetchCaptcha(emailForm.email)
    if (!success) {
        codeButtonRef.value?.resetCountdown()
    }
}

// 验证邮箱表单
const validateEmailForm = () => {
    return emailInputRef.value?.validate() && emailCodeInputRef.value?.validate()
}

// 验证密码表单
const validatePasswordForm = () => {
    return originalPwdInputRef.value?.validate() &&
        newPwdInputRef.value?.validate() &&
        confirmPwdInputRef.value?.validate()
}

// 提交邮箱绑定
const handleEmailBinding = async () => {
    if (!validateEmailForm()) {
        message.error('请填写完整且正确的邮箱信息')
        return
    }

    try {
        const param = {
            uid: userStore.uid,
            email: emailForm.email,
            emailVerifyCode: emailForm.code
        }

        await authStore.fetchUpdateEmail(param)
        isShowEmailForm.value = false
        // 清空表单
        emailForm.email = ''
        emailForm.code = ''
    } catch (error) {
        // 错误已在 store 中处理
    }
}

// 提交密码修改
const handlePasswordChange = async () => {
    if (!validatePasswordForm()) {
        message.error('请填写完整且正确的密码信息')
        return
    }

    try {
        const param = {
            uid: userStore.uid,
            originalPassword: passwordForm.originalPassword,
            newPassword: passwordForm.newPassword
        }

        const resp = await authStore.fetchUpdatePassword(param)
        if (resp) {
            // 清空表单
            passwordForm.originalPassword = ''
            passwordForm.newPassword = ''
            passwordForm.confirmPassword = ''
            setTimeout(() => {
                authStore.logout()
                router.replace('/login')
            }, 1000)

        }
    } catch (error) {
        // 错误已在 store 中处理
    }
}

// 取消邮箱绑定
const handleCancelEmailBinding = () => {
    isShowEmailForm.value = false
    emailForm.email = ''
    emailForm.code = ''
}

onMounted(async () => {
    // 获取登录信息
    await authStore.fetchLoginRecord()
})
</script>
<style scoped lang="scss">
@use '@/assets/styles/user/_user-security.scss' as *;
</style>