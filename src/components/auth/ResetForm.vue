<template>
    <div class="reset-form">
        <div class="reset-label">
            <h3>RESET</h3>
            <span><i class="iconfont icon-dengji"></i></span>
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
                    <AoInput placeholder="新密码" />
                </div>
                <div class="confirm-password">
                    <AoInput placeholder="确认新密码" />
                </div>
            </form>
        </div>

        <div class="reset-btn">
            <button>重置密码</button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoInput from '../common/AoInput.vue';

</script>
<style scoped lang="scss">
@use '@/assets/styles/auth/_reset-form.scss' as *;
</style>