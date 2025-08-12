<template>
    <div class="recommend-submit">
        <div class="recommend-form">
            <SubmitForm>
            </SubmitForm>
        </div>
        <div class="submit-button">
            <div class="save">
                <button>暂存</button>
            </div>
            <div class="submit">
                <button>提交</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import SubmitForm from '../../components/submit/SubmitForm.vue';

</script>
<style lang="scss" scoped>
@use '@/assets/styles/submit/_recommend-submit.scss' as *;
</style>