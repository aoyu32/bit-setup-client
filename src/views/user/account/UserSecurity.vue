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
                        <span>登录用户名：</span>
                    </div>
                    <div class="username">
                        <span>aoyu</span>
                    </div>
                </div>
                <div class="last-login info-items">
                    <div class="last-ip item">
                        <div class="info-label">
                            <span>上一次登录IP：</span>
                        </div>
                        <div class="ip">
                            <span>113.34.234.2</span>
                        </div>
                        <div class="ip-area">
                            <span>安徽阜阳</span>
                        </div>
                    </div>
                    <div class="last-login-time item">
                        <div class="info-label">
                            <span>上一次登录时间：</span>
                        </div>
                        <div class="date">
                            <span>2025-02-02 12:02:23</span>
                        </div>
                    </div>

                </div>
                <div class="current-login info-items">
                    <div class="current-ip item">
                        <div class="info-label">
                            <span>本次登录IP：</span>
                        </div>
                        <div class="ip">
                            <span>113.34.234.2</span>
                        </div>
                        <div class="ip-area">
                            <span>湖北孝感</span>
                        </div>
                    </div>
                    <div class="current-login-time item">
                        <div class="info-label">
                            <span>本次登录时间：</span>
                        </div>
                        <div class="date">
                            <span>2025-02-04 14:02:34</span>
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
                            <span>绑定邮箱：</span>
                        </div>
                        <div class="binding-form">
                            <div class="email-input">
                                <ao-input />
                            </div>
                            <div class="vcode-input-wrapper">
                                <div class="vcode-input">
                                    <ao-input />
                                </div>
                                <div class="vcode-btn">
                                    <button>
                                        发送验证码
                                    </button>
                                </div>
                            </div>
                            <div class="submit-binding">
                                <button class="cancel-binding" @click="isShowEmailForm = false">取消</button>
                                <button class="confirm-binding">绑定</button>
                            </div>
                        </div>
                    </div>
                    <div class="has-bound item" v-else>
                        <div class="info-label">
                            <span>绑定邮箱：</span>
                        </div>
                        <div class="email">
                            <span>aoyu3256@gmail.com</span>
                        </div>
                        <div class="change-binding">
                            <button @click="isShowEmailForm = true">切换邮箱</button>
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
                            <ao-input />
                            <p class="tip" style="opacity: 0;">原密码错误</p>
                        </div>
                        <div class="new-pwd input-item">
                            <ao-input />
                            <p class="tip" style="opacity: 0;">新密码1~6位数字加字母组合</p>
                        </div>
                        <div class="confirm-pwd input-item">
                            <ao-input />
                            <p class="tip" style="opacity: 0;">两次密码不一致</p>
                        </div>
                    </div>
                    <div class="submit-btn">
                        <button>确认修改</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoInput from '@/components/common/AoInput.vue';
const isShowEmailForm = ref(false)
</script>
<style scoped lang="scss">
@use '@/assets/styles/user/_user-security.scss' as *;
</style>