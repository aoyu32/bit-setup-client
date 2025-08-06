<template>
    <div class="detail-docs">
        <div class="detail-docs-header">
            <div class="header-left">
                <slot name="left">
                    <span>文档标签</span>
                </slot>
            </div>
            <div class="header-right">
                <slot name="right">
                </slot>
            </div>
        </div>
        <div class="detail-docs-main">
            <AoMarkdwon :markdownFile="docs"/>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoMarkdwon from '@/components/common/AoMarkdwon.vue';
const pops = defineProps(['docs'])
</script>
<style lang="scss" scoped>
@use '@/assets/styles/detail/_detail-docs.scss' as *;
</style>