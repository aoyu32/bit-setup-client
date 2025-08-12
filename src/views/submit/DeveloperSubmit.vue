<template>
    <div class="developer-submit">
        <div class="developer-form">
            <SubmitForm>
                <template #app-icon>
                    <div class="app-icon">
                        <div class="form-content">
                            <AoUpload />
                        </div>
                    </div>
                </template>
                <template #file-upload>
                    <div class="app-file-upload">
                        <div class="form-label">
                            文件上传
                        </div>
                        <div class="form-content">
                            <AoUpload />
                        </div>
                    </div>
                </template>
                <template #prove>
                    <div class="app-prove">
                        <div class="form-label">
                            开发者凭证
                        </div>
                        <div class="form-content">
                            <AoUpload />
                            <AoUpload />
                            <AoUpload />
                        </div>
                    </div>
                </template>

            </SubmitForm>
        </div>
        <div class="submit-button">
            <div class="save">
                <button>暂存</button>
            </div>
            <div class="submit">
                <button> 提交</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import SubmitForm from '../../components/submit/SubmitForm.vue';

import AoUpload from '@/components/common/AoUpload.vue';
</script>
<style scoped lang="scss">
@use '@/assets/styles/submit/_developer-submit.scss' as *;
</style>