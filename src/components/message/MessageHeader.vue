<template>
    <div class="msg-header">
        <div class="header-left">
            <div class="msg-label">
                <span><i :class="['iconfont', label.icon]"></i></span>
                <span> {{ label.name }}</span>
            </div>
        </div>
        <div class="header-right">
            <button>一键已读</button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps(['label'])

</script>
<style lang="scss" scoped>
.msg-header {
    @include wh;
    @include flex(c, s-b);
    padding: 10px 20px;
    box-shadow: shadow(m);
    @include b-r($b-r);

    @include c-t {
        background-color: color(c-g);
        color: color(c-p);
    }

    .msg-label {
        font-size: 15px;

        .iconfont {
            font-size: 17px;
            margin-right: 5px;
        }
    }

    .header-right {
        button {
            padding: 7px 15px;
            @include b-r($b-r);
            font-size: 13px;

            @include c-t {
                background-color: color(c-s-lighter);

            }

        }
    }
}
</style>