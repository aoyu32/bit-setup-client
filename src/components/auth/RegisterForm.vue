<template>
    <div class="register-form">
        <div class="register-label">
            <h3>REGISTER</h3>
            <span><i class="iconfont icon-xinzengdan"></i></span>
        </div>
        <div class="form">
            <form @submit.prevent>
                <div class="email">
                    <AoInput placeholder="邮箱" v-model="regForm.email" :rules="rules.email" ref="emailInput">
                        <template #icon>
                            <i class="iconfont icon-mail"></i>
                        </template>
                    </AoInput>
                </div>
                <div class="vcode">
                    <div class="vcode-input">
                        <AoInput placeholder="验证码" v-model="regForm.code" :rules="rules.code" ref="codeInput">
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
                    <AoInput type="password" placeholder="密码" v-model="regForm.password" :rules="rules.password"
                        ref="passwordInput">
                        <template #icon>
                            <i class="iconfont icon-lock"></i>
                        </template>
                    </AoInput>
                </div>
                <div class="confirm-password">
                    <AoInput type="password" placeholder="确认密码" v-model="regForm.confirmPassword"
                        :rules="rules.confirmPass" ref="confirmPasswordInput">
                        <template #icon>
                            <i class="iconfont icon-key"></i>
                        </template>
                    </AoInput>
                </div>
                <div class="register-btn">
                    <button type="submit" @click="handleRegister">{{ regButton }}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import AoInput from '../common/AoInput.vue'

const regForm = reactive({
    email: '',
    code: '',
    password: '',
    confirmPassword: ''
})

const regButton = ref('注册')

// 引用 AoInput 组件实例以手动触发校验
const emailInput = ref(null)
const codeInput = ref(null)
const passwordInput = ref(null)
const confirmPasswordInput = ref(null)

// 邮箱验证：支持标准邮箱格式，包括QQ邮箱
const validateEmail = (value) => {
    if (!value) return
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(value) ? true : '请输入有效的邮箱地址'
}

// 验证码验证：6位数字
const validateCode = (value) => {
    if(!value) return 
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
    return value === regForm.password ? true : '两次密码输入不一致'
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

const isEmailValid = computed(() => {
    return validateEmail(regForm.email)
})

const isFormValid = () => {
    return (emailInput.value.validate() && codeInput.value.validate()
        && passwordInput.value.validate() && confirmPasswordInput.value.validate())
}

// 发送验证码逻辑（模拟）
const sendCode = () => {
    console.log('rerew');

}

// 注册逻辑
const handleRegister = () => {
    console.log(isEmailValid.value);
    console.log(!isFormValid());

    if (!isFormValid()) {
        alert("表单不合格")
        return
    }
    alert("开始注册")
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/auth/_register-form.scss' as *;
</style>