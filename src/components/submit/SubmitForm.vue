<template>
    <div class="submit-form">
        <div class="form-top">
            <slot name="app-icon">
            </slot>
            <div class="app-name">
                <div class="form-label">
                    应用名称
                </div>
                <div class="form-content">
                    <AoInput />
                </div>
            </div>
            <div class="app-category">
                <div class="form-label">
                    应用分类
                </div>
                <div class="form-content">
                    <AoSelector />
                    <AoSelector />
                </div>
            </div>
            <div class="app-version">
                <div class="form-label">
                    应用版本
                </div>
                <div class="form-content">
                    <AoInput />
                </div>
            </div>
            <div class="app-version">
                <div class="form-label">
                    应用大小
                </div>
                <div class="form-content">
                    <AoInput />
                </div>
            </div>
            <div class="app-fee">
                <div class="form-label">
                    付费制度
                </div>
                <div class="form-content">
                    <AoSelector />
                </div>
            </div>
        </div>
        <div class="form-center">
            <div class="app-official">
                <div class="form-label">
                    官网地址
                </div>
                <div class="form-content">
                    <AoInput />
                </div>
            </div>
            <div class="app-download">
                <div class="form-label">
                    下载地址
                </div>
                <div class="form-content">
                    <AoInput />
                </div>
            </div>
        </div>
        <div class="form-bottom">
            <div class="bio-file">
                <div class="app-bio">
                    <div class="form-label">
                        应用描述
                    </div>
                    <div class="form-content">
                        <AoTextarea />
                    </div>
                </div>
                <slot name="file-upload">
       
                </slot>
            </div>
            <div class="screenshot">
                <div class="app-interface">
                    <div class="form-label">
                        应用截图
                    </div>
                    <div class="form-content">
                        <AoUpload />
                        <AoUpload />
                        <AoUpload />
                    </div>
                </div>
                <slot name="prove">
                   
                </slot>

            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoUpload from '@/components/common/AoUpload.vue';
import AoSelector from '@/components/common/AoSelector.vue';
import AoInput from '../common/AoInput.vue';
import AoTextarea from '../common/AoTextarea.vue';


</script>
<style lang="scss" scoped>
@use '@/assets/styles/submit/_submit-form.scss' as *;
</style>