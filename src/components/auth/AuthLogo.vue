<template>
    <div class="auth-logo">
        <div class="logo-img">
            <img :src="logoSvg" alt="">
        </div>
        <div class="logo-name">
            <span>比特聚合</span>
        </div>
    </div>
</template>
<script setup>
import logoSvg from '@/assets/logo.svg'
</script>
<style scoped lang="scss">
.auth-logo {
    @include wh;
    @include flex(c, c, c);
    .logo-img {
        @include wh(100p, n);
        @include flex(c, c);
        img {
            @include wh(75p);
        }
    }

    .logo-name {
        font-size: 19px;
        padding-left: 10px;
        letter-spacing: 10px;
        @include c-t{
            color: color(c-g9);
        }
    }
}
</style>