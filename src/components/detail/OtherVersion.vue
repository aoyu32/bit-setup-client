<template>
    <div class="other-version">
        <div class="other-version-header">
            <div class="version-selector">
                <AoSelector :options="versionOptions">
                    <template #left-icon>
                        <div class="app-img">
                            <img src="https://pc3.gtimg.com/softmgr/logo/48/36273_48_1730881145.png" alt="">
                        </div>
                    </template>
                    <template #right-icon>
                        <div class="version-info">
                            <div class="version-size">
                                <span>大小：</span>
                                <span>100MB</span>
                            </div>
                            <div class="version-download">
                                <span>下载量：</span>
                                <span>1000</span>
                            </div>
                        </div>
                        <div class="arrow-icon">
                            <span class="right-icon"><i class="iconfont icon-xiangxia-1"></i></span>
                        </div>
                    </template>
                </AoSelector>
            </div>
        </div>
        <div class="other-version-main">
            <div class="log">
                <div class="label">
                    <h4>版本更新日志：</h4>
                </div>
                <div class="log-content">
                    <AoMarkdwon markdownFile="public/docs/app-log.md" />
                </div>
            </div>
        </div>
        <div class="other-version-footer">
            <div class="label">
                <h4>下载该版本：</h4>
            </div>
            <div class="links">
                <a href="">
                    <span>直链下载（10A币）</span>
                </a>
                <a href="">
                    <span>网盘下载</span>
                </a>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue"
import AoSelector from '@/components/common/AoSelector.vue';
import AoMarkdwon from '@/components/common/AoMarkdwon.vue';

const versionOptions = ref([
    {
        label: '谷歌浏览器（V1.0.0）',
        value: 'v1.0.0'
    },
    {
        label: '谷歌浏览器（V1.0.1）',
        value: 'v1.0.1'
    },
    {
        label: '谷歌浏览器（V2.0.0）',
        value: 'v2.0.0'
    },
    {
        label: '谷歌浏览器（V3.0.0）',
        value: 'v3.0.0'
    }

])

</script>
<style lang="scss" scoped>
@use '@/assets/styles/detail/_other-version.scss' as *;
</style>