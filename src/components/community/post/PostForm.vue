<template>
    <div class="post-form">
        <div class="form-header">
            <div class="title-input">
                <AoInput :placeholder="'请输入文章标题'" />
            </div>
            <div class="tag">
                <AoSelctor :options="['话题', '求助', '教程', '文章']" />
            </div>
        </div>
        <div class="form-main">
            <div class="abstract">
                <AoTextarea />
            </div>
            <div class="upload-img">
                <AoUpload />
                <AoUpload />
                <AoUpload />
            </div>
        </div>
    </div>
</template>
<script setup>
import AoSelctor from '@/components/common/AoSelector.vue';
import AoInput from '../../common/AoInput.vue';
import AoTextarea from '../../common/AoTextarea.vue';
import AoUpload from '../../common/AoUpload.vue';
</script>
<style scoped lang="scss">
@use '@/assets/styles/community/post/_post-form.scss' as *;
</style>