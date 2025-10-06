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
                <UserEditForm 
                    ref="userEditFormRef"
                    @upload-avatar="handleUploadAvatar" 
                    @submit="handleSubmit" 
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserEditForm from '../../../components/user/UserEditForm.vue';
import { useUserInfoStore } from '../../../stores/user';
import message from '../../../utils/message';

const userStore = useUserInfoStore()
const userEditFormRef = ref(null)

// 处理头像上传
const handleUploadAvatar = async (file) => {
    try {
        // 上传头像并获取URL
        const avatarUrl = await userStore.fetchUploadAvatar(file)
        
        // 将上传后的头像URL传递给子组件
        if (userEditFormRef.value && avatarUrl) {
            userEditFormRef.value.updateAvatarUrl(avatarUrl)
            message.success('头像上传成功！')
        }
    } catch (error) {
        message.error('头像上传失败，请重试')
        console.error('头像上传失败:', error)
        
        // 上传失败时取消头像修改
        if (userEditFormRef.value) {
            userEditFormRef.value.cancelAvatarChange()
        }
    }
}

// 处理表单提交
const handleSubmit = async (formData) => {
    try {
        console.log("更新表单数据：", formData);
        await userStore.fetchUpdateUser(formData)
        message.success('资料更新成功！')
    } catch (error) {
        message.error('资料更新失败，请重试')
        console.error('资料更新失败:', error)
    }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/user/_user-edit.scss' as *;
</style>