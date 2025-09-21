<template>
    <div class="login">
        <AoLoadding text="登录中" :full="true" v-if="loadding" />
        <div class="login-wrapper">
            <div class="login-left">
                <router-link class="back-home" to="/home">
                    <div class="back-home-wrapper">
                        <span><i class="iconfont icon-shouye-2"></i></span>
                    </div>
                </router-link>
                <div class="auth-logo-container">
                    <AuthLogo />
                </div>
                <div class="go-register">
                    <span>没有账号？</span>
                    <router-link to="/register">去注册</router-link>
                </div>
            </div>
            <div class="login-right">
                <div class="login-form-container">
                    <LoginForm @login="handleLogin" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import AuthLogo from '../../components/auth/AuthLogo.vue';
import LoginForm from '../../components/auth/LoginForm.vue';
import AoLoadding from '../../components/common/AoLoadding.vue';
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router';
const router = useRouter()
const loadding = ref(false)
const authStore = useAuthStore()
const handleLogin = async (data) => {
    const res = await authStore.fetchLogin(data)
    if(res){
        router.replace('/home')
    }
}


</script>
<style lang="scss" scoped>
.login {
    @include wh(100p, 100vh);
    @include flex(c, c);

    @include c-t {
        background-color: color(c-p-lighter, 0.1)
    }

    .login-wrapper {
        @include flex;
        @include wh(800, 500);
        @include b-r($b-r);
        box-shadow: shadow(l);

        @include c-t {
            background-color: color(c-g0);
        }
    }

    .go-register {
        @include p-a(b40);
        font-size: 14px;

        span {
            @include c-t {
                color: color(c-g5);
            }
        }

        a {
            @include c-t {
                color: color(c-p-lighter);
            }
        }
    }

    .back-home {
        @include p-a(t0, l0);
        @include wh(40px);
        clip-path: polygon(0 0, 100% 0, 0 100%);
        @include b-r($b-r, 0, 0, 0);
        transition: all 0.2s ease-out;

        @include c-t {
            background-color: color(c-s-lighter, 0.7);
            color: color(c-g);
        }

        &:hover {
            @include c-t {
                background-color: color(c-s-lighter);
                color: color(c-g);
            }

        }

        .back-home-wrapper {

            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;

            span {
                @include p-a(t10p, l10p);
                transform: rotate(-45deg);
                line-height: 1;
            }

            .iconfont {
                font-size: 17px;
            }
        }
    }



    .login-left {
        @include wh(50p, 100p);
        @include flex(c, c);
        position: relative;

        @include c-t {
            border-right: 1px solid color(c-g5, 0.2);
        }
    }

    .auth-logo-container {
        @include wh(50p, 50p);

        @include c-t {
            background-color: color(c-g1, 0.3);
        }
    }

    .login-right {
        @include wh(50p, 100p);
    }

    .login-form-container {
        @include wh;
    }
}
</style>