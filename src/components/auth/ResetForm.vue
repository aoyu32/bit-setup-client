<template>
    <div class="reset-form">
        <div class="reset-label">
            <h3>RESET</h3>
            <span><i class="iconfont icon-dengji"></i></span>
        </div>
        <div class="form">
            <form @submit.prevent="handleReset">
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
                        <button type="button" :disabled="!isEmailValid" @click="sendCode">获取验证码</button>
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
                    <button type="submit" :disabled="!isFormValid">重置密码</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import AoInput from '../common/AoInput.vue'

const resetForm = ref({
    email: '',
    code: '',
    password: '',
    confirmPassword: ''
})

// 引用 AoInput 组件实例以手动触发校验
const emailInput = ref(null)
const codeInput = ref(null)
const passwordInput = ref(null)
const confirmPasswordInput = ref(null)

// 邮箱验证：支持标准邮箱格式
const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(value) ? true : '请输入有效的邮箱地址'
}

// 验证码验证：6位数字
const validateCode = (value) => {
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
    return value === resetForm.value.password ? true : '两次密码输入不一致'
}

// 校验规则：实时校验（input）和失焦校验（blur）
const rules = reactive({
    email: [
        { validator: validateEmail, trigger: 'input' },
        { validator: validateEmail, trigger: 'blur' }
    ],
    code: [
        { validator: validateCode, trigger: 'input' },
        { validator: validateCode, trigger: 'blur' }
    ],
    password: [
        { validator: validatePassword, trigger: 'input' },
        { validator: validatePassword, trigger: 'blur' }
    ],
    confirmPass: [
        { validator: validateConfirmPass, trigger: 'input' },
        { validator: validateConfirmPass, trigger: 'blur' }
    ]
})

// 计算表单整体有效性
const isFormValid = computed(() => {
    return (
        validateEmail(resetForm.value.email) === true &&
        validateCode(resetForm.value.code) === true &&
        validatePassword(resetForm.value.password) === true &&
        validateConfirmPass(resetForm.value.confirmPassword) === true
    )
})

// 计算邮箱是否有效，用于控制“获取验证码”按钮
const isEmailValid = computed(() => {
    return validateEmail(resetForm.value.email) === true
})

// 发送验证码逻辑（模拟）
const sendCode = () => {
    if (isEmailValid.value) {
        alert('验证码已发送至您的邮箱！')
        // 这里可以添加实际的发送验证码逻辑
    }
}

// 重置密码逻辑
const handleReset = () => {
    // 手动触发所有输入框的校验
    emailInput.value.validate()
    codeInput.value.validate()
    passwordInput.value.validate()
    confirmPasswordInput.value.validate()

    if (isFormValid.value) {
        alert('密码重置成功！')
        // 这里可以添加实际的重置密码逻辑，比如调用 API
    }
}
</script>
<style scoped lang="scss">
@use '@/assets/styles/auth/_reset-form.scss' as *;
</style>