<template>
    <div class="list-card">
        <div class="card-header">
            <div class="header-left">
                <slot name="label">默认标题</slot>
            </div>
            <div class="header-right">
                <slot name="operate">
                    <div class="page">
                        <div class="pre-page">
                            <span><i class="iconfont icon-left"></i></span>
                        </div>
                        <div class="page-count">
                            <span>5</span>
                        </div>
                        <div class="next-page">
                            <span><i class="iconfont icon-right"></i></span>
                        </div>
                    </div>
                </slot>
            </div>
        </div>
        <div class="card-main">
            <slot name="list"></slot>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
    list: Array,
    default: []
})
</script>
<style lang="scss" scoped></style>