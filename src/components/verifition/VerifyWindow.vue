<template>
    <div class="captcha-window">
        <div class="captcha">
            <div class="captcha-header">
                <h4>请完成安全校验</h4>
                <button><i class="iconfont icon-close" @click="close"></i></button>
            </div>
            <div class="captcha-body">
                <Verify @success="success" :mode="'fixed'" :captchaType="'blockPuzzle'"
                    :imgSize="{ width: '330px', height: '155px' }"></Verify>
            </div>
        </div>
    </div>
</template>
<script setup>
import Verify from './Verify.vue';

const emit = defineEmits(["on-success", "on-close"])

//验证成功回调
const success = (param) => {
    emit("on-success", param)
    console.log("验证成功");

    close()
}

//关闭验证窗口
const close = () => {
    emit("on-close")
}



</script>
<style lang="scss" scoped>
@use '@/assets/styles/common/main.scss' as *;

.captcha-window {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    flex-direction: column;

    @include c-t {
        background-color: color(c-g9, 0.5);
    }

    .captcha {
        padding: 15px;
        border-radius: 4px;

        @include c-t {

            background-color: color(c-g0);
            box-shadow: 0 10px 25px color(c-g5, 0.5);
        }

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .captcha-header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            h4 {
                @include c-t {
                    color: color(c-g9);
                }
            }

            button {
                background-color: none;
                border: none;
                background-color: transparent;

                @include c-t {
                    color: color(c-g9);
                }

                transition: 0.3s ease-in-out;

                &:hover {
                    @include c-t {
                        color: color(c-g9);
                    }
                }
            }
        }
    }
}
</style>