<template>
    <div class="login-form">
        <div class="login-label">
            <h3>LOGIN</h3>
            <span><i class="iconfont icon-paidan"></i></span>
        </div>
        <div class="form">
            <form>
                <div class="account">
                    <AoInput placeholder="用户名/邮箱" />
                </div>
                <div class="password">
                    <AoInput placeholder="密码" />
                </div>
            </form>
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
                <router-link to="/reset">
                    忘记密码
                </router-link>
            </div>
        </div>
        <div class="login-btn">
            <button>登录</button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoInput from '../common/AoInput.vue';
const isChecked = ref(false)

</script>
<style scoped lang="scss">
@use '@/assets/styles/auth/_login-form.scss' as *;
</style>