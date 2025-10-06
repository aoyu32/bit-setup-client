<template>
    <div class="reset-form">
        <div class="reset-label">
            <h3>RESET</h3>
            <span><i class="iconfont icon-xinzengdan"></i></span>
        </div>
        <div class="form">
            <form @submit.prevent>
                <div class="email">
                    <AoInput placeholder="邮箱" v-model="resetForm.email" :rules="rules.email" ref="emailInput">
                        <template #icon>
                            <i class="iconfont icon-mail"></i>
                        </template>
                    </AoInput>
                </div>
                <div class="vcode">
                    <div class="vcode-input">
                        <AoInput placeholder="验证码" v-model="resetForm.code" :rules="rules.code" ref="codeInput">
                            <template #icon>
                                <i class="iconfont icon-yanzhengma1"></i>
                            </template>
                        </AoInput>
                    </div>
                    <div class="send-code">
                        <AoTimeButton text="获取验证码" :countdown="60" @click="handleSendCode" :disabled="!isEmailValid"
                            ref="codeButtonRef" />
                    </div>
                </div>
                <div class="password">
                    <AoInput type="password" placeholder="新密码" v-model="resetForm.password" :rules="rules.password"
                        ref="passwordInput">
                        <template #icon>
                            <i class="iconfont icon-lock"></i>
                        </template>
                    </AoInput>
                </div>
                <div class="confirm-password">
                    <AoInput type="password" placeholder="确认新密码" v-model="resetForm.confirmPassword"
                        :rules="rules.confirmPass" ref="confirmPasswordInput">
                        <template #icon>
                            <i class="iconfont icon-key"></i>
                        </template>
                    </AoInput>
                </div>
                <div class="reset-btn">
                    <button type="submit" @click="handleResetPassword">
                        {{ resetButton }}
                    </button>
                </div>
            </form>
        </div>
        <div class="verify-window-container" v-if="isShowVerify">
            <VerifyWindow @on-success="handleVerifySuccess" @on-close="isShowVerify = false" />
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import message from '@/utils/message'
import AoInput from '../common/AoInput.vue'
import VerifyWindow from '../verifition/VerifyWindow.vue'
import AoTimeButton from '../common/AoTimeButton.vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const isShowVerify = ref(false)

const resetForm = reactive({
    email: '',
    code: '',
    password: '',
    confirmPassword: ''
})

const resetButton = ref('重置密码')

// 定义 emit
const emit = defineEmits(['reset-password'])

// 引用 AoInput 组件实例以手动触发校验
const emailInput = ref(null)
const codeInput = ref(null)
const passwordInput = ref(null)
const confirmPasswordInput = ref(null)
const codeButtonRef = ref(null)

// 邮箱验证：支持标准邮箱格式，包括QQ邮箱
const validateEmail = (value) => {
    if (!value) return '邮箱不能为空'
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(value) ? true : '请输入有效的邮箱地址'
}

// 验证码验证：6位数字
const validateCode = (value) => {
    if (!value) return '验证码不能为空'
    const codeRegex = /^\d{6}$/
    return codeRegex.test(value) ? true : '验证码必须为6位数字'
}

// 密码验证：1-16位，包含数字和字母
const validatePassword = (value) => {
    if (!value) return '密码不能为空'
    const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{1,16}$/
    return passRegex.test(value) ? true : '密码需为1-16位数字和字母组合'
}

// 确认密码验证：与密码一致
const validateConfirmPass = (value) => {
    if (!value) return '确认密码不能为空'
    return value === resetForm.password ? true : '两次密码输入不一致'
}

// 校验规则：添加实时校验（input）和失焦校验（blur）
const rules = reactive({
    email: [
        { validator: validateEmail, trigger: 'input' },
    ],
    code: [
        { validator: validateCode, trigger: 'input' },
    ],
    password: [
        { validator: validatePassword, trigger: 'input' },
    ],
    confirmPass: [
        { validator: validateConfirmPass, trigger: 'input' },
    ]
})

const isEmailValid = ref(false)

watch(() => resetForm.email, newValue => {
    const validationResult = validateEmail(newValue)
    isEmailValid.value = validationResult === true
})

const isFormValid = () => {
    return (emailInput.value?.validate() && codeInput.value?.validate()
        && passwordInput.value?.validate() && confirmPasswordInput.value?.validate())
}

const handleSendCode = async () => {
    if (!isEmailValid.value) return

    const success = await authStore.fetchCaptcha(resetForm.email)
    if (!success) {
        codeButtonRef.value?.resetCountdown()
    }
}

const handleVerifySuccess = async (param) => {
    const resetData = {
        verifyCode: param.captchaVerification,
        account: resetForm.email,
        emailVerifyCode: resetForm.code,
        password: resetForm.confirmPassword
    }

    emit("reset-password", resetData)
}

const handleResetPassword = () => {
    if (!isFormValid()) {
        message.error('请填写完整且正确的信息')
        return
    }

    isShowVerify.value = true
}
</script>
<style scoped lang="scss">
@use '@/assets/styles/auth/_reset-form.scss' as *;
</style>