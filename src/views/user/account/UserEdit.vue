<template>
    <div class="user-edit">
        <div class="user-edit-top">
            <div class="edit-label">
                <i class="iconfont icon-dengji"></i>
                <h3>修改资料</h3>
            </div>
        </div>
        <div class="user-edit-bottom">
            <div class="form-container">
                <UserEditForm />
            </div>
        </div>
    </div>
</template>
<script setup>
import UserEditForm from '../../../components/user/UserEditForm.vue';


</script>
<style scoped lang="scss">
@use '@/assets/styles/user/_user-edit.scss' as *;
</style>