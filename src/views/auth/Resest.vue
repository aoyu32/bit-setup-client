<template>
    <div class="reset">
        <div class="reset-wrapper">
            <div class="reset-left">
                <div class="auth-logo-container">
                    <AuthLogo />
                </div>
                <router-link class="back-home" to="/home">
                    <div class="back-home-wrapper">
                        <span><i class="iconfont icon-shouye-2"></i></span>
                    </div>
                </router-link>
                <div class="go-reset">
                    <span>想起密码？</span>
                    <router-link to="/login">去登录</router-link>
                </div>
            </div>
            <div class="reset-right">
                <div class="reset-form-container">
                    <ResetForm />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import AuthLogo from '@/components/auth/AuthLogo.vue';
import ResetForm from '@/components/auth/ResetForm.vue';



</script>
<style lang="scss" scoped>
.reset {
    @include wh(100p, 100vh);
    @include flex(c, c);

    @include c-t {
        background-color: color(c-p-lighter, 0.1)
    }

    .reset-wrapper {
        @include flex;
        @include wh(800, 500);
        @include b-r($b-r);
        box-shadow: shadow(l);

        @include c-t {
            background-color: color(c-g0);
        }
    }

    .go-reset {
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



    .reset-left {
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

    .reset-right {
        @include wh(50p, 100p);

        @include c-t {
            border-left: 1px solid color(c-g5, 0.2);
        }
    }

    .reset-form-container {
        @include wh;
    }
}
</style>