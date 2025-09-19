<template>
    <div class="login-form">
        <div class="login-label">
            <h3>LOGIN</h3>
            <span><i class="iconfont icon-paidan"></i></span>
        </div>
        <div class="form">
            <form @submit.prevent="handleLogin">
                <div class="account">
                    <AoInput placeholder="用户名/邮箱" type="text" v-model="loginForm.account" :rules="rules.account"
                        ref="accountInput">
                        <template #icon>
                            <i class="iconfont icon-user"></i>
                        </template>
                    </AoInput>
                </div>
                <div class="password">
                    <AoInput placeholder="密码" type="password" v-model="loginForm.password" :rules="rules.password"
                        ref="passwordInput">
                        <template #icon>
                            <i class="iconfont icon-lock"></i>
                        </template>
                    </AoInput>
                </div>
                <div class="remember-forget">
                    <div class="remember-pwd">
                        <div class="checkbox-group" :class="{ checked: isChecked }" @click="isChecked = !isChecked">
                            <span>
                                <i class="iconfont icon-icon-check-square" v-if="!isChecked"></i>
                                <i class="iconfont icon-check-square1" v-else></i>
                            </span>
                            <span>记住密码</span>
                        </div>
                    </div>
                    <div class="forget-pwd">
                        <router-link to="/reset">忘记密码</router-link>
                    </div>
                </div>
                <div class="login-btn">
                    <button type="submit">登录</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import AoInput from '../common/AoInput.vue'

const loginForm = reactive({
    account: '',
    password: ''
})

const isChecked = ref(false)

// 引用 AoInput 组件实例以手动触发校验
const accountInput = ref(null)
const passwordInput = ref(null)

const validateAccount = (value) => {

    return value ? true : `账号不能为空`
}
const validatePassword = (value) => {
    
    return value ? true : `密码不能为空`
}

// 校验规则：仅非空校验，触发方式为 'blur'（失焦时提示）
const rules = reactive({
    account: [
        { validator: validateAccount, trigger: 'input' }
    ],
    password: [
        { validator: validatePassword, trigger: 'input' }
    ]
})

// 计算表单整体有效性（仅检查非空，用于按钮状态，如果需要）
const isFormValid = computed(() => {
    return (
        validateNotEmpty(loginForm.value.account) === true &&
        validateNotEmpty(loginForm.value.password) === true
    )
})

// 登录逻辑
const handleLogin = () => {
    // 手动触发非空校验
    accountInput.value.validate()
    passwordInput.value.validate()

    // 检查非空验证结果
    const isAccountNotEmpty = validateNotEmpty(loginForm.value.account) === true
    const isPasswordNotEmpty = validateNotEmpty(loginForm.value.password) === true

    if (isAccountNotEmpty && isPasswordNotEmpty) {

    }
}
</script>
<style scoped lang="scss">
@use '@/assets/styles/auth/_login-form.scss' as *;
</style>