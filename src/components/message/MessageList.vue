<template>
    <div class="msg-list">
        <slot>
        </slot>
    </div>
</template>
<script setup></script>
<style scoped lang="scss">
.msg-list{
    @include wh(100p,n);
    @include flex(n,n,c);
    gap: 20px;
    padding: 20px;
    @include b-r($b-r);
    box-shadow: shadow(m);
    @include c-t{
        background-color: color(c-g);
    }
}
</style>