<template>
    <div class="register-form">
        <div class="register-label">
            <h3>REGISTER</h3>
            <span><i class="iconfont icon-xinzengdan"></i></span>
        </div>
        <div class="form">
            <form>
                <div class="email">
                    <AoInput placeholder="邮箱" />
                </div>
                <div class="vcode">
                    <div class="vcode-input">
                        <AoInput placeholder="验证码" />
                    </div>
                    <div class="send-code">
                        <button>获取验证码</button>
                    </div>
                </div>
                <div class="password">
                    <AoInput placeholder="密码" />
                </div>
                <div class="confirm-password">
                    <AoInput placeholder="确认密码" />
                </div>
            </form>
        </div>

        <div class="register-btn">
            <button>注册</button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoInput from '../common/AoInput.vue';

</script>
<style scoped lang="scss">
@use '@/assets/styles/auth/_register-form.scss' as *;
</style>