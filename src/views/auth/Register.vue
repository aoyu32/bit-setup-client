<template>
    <div class="register">
        <div class="loadding-container">
            <AoLoadding :text="loaddingText" v-if="loadding" :full="true" />
        </div>
        <div class="register-wrapper">
            <div class="register-left">
                <div class="register-form-container">
                    <RegisterForm @register="handleRegister" />
                </div>

            </div>
            <div class="register-right">
                <div class="auth-logo-container">
                    <AuthLogo />
                </div>
                <router-link class="back-home" to="/home">
                    <div class="back-home-wrapper">
                        <span><i class="iconfont icon-shouye-2"></i></span>
                    </div>
                </router-link>
                <div class="go-register">
                    <span>已有账号？</span>
                    <router-link to="/login">去登录</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import AuthLogo from '@/components/auth/AuthLogo.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
import AoLoadding from '../../components/common/AoLoadding.vue';
import { useRouter } from 'vue-router';

const loadding = ref(false)
const loaddingText = ref("")

const router = useRouter()
const handleRegister = () => {
    setTimeout(() => {
        loadding.value = true
        loaddingText.value = "登录中"
        loadding.value = false
        router.replace('/home')
    }, 2000)
}

</script>
<style lang="scss" scoped>
.register {
    @include wh(100p, 100vh);
    @include flex(c, c);

    @include c-t {
        background-color: color(c-p-lighter, 0.1)
    }

    .register-wrapper {
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
        @include p-a(t0, r0);
        @include wh(40px);
        clip-path: polygon(100% 0, 100% 100%, 0 0);
        @include b-r(0, $b-r, 0, 0);
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
                @include p-a(t10p, r10p);
                transform: rotate(45deg);
                line-height: 1;
            }

            .iconfont {
                font-size: 17px;
            }
        }
    }

    .register-right {
        @include wh(50p, 100p);
        @include flex(c, c);
        position: relative;

    }

    .auth-logo-container {
        @include wh(50p, 50p);

        @include c-t {
            background-color: color(c-g1, 0.5);
        }
    }

    .register-left {
        @include wh(50p, 100p);

        @include c-t {
            border-right: 1px solid color(c-g5, 0.2);
        }
    }

    .register-form-container {
        @include wh;
    }
}
</style>