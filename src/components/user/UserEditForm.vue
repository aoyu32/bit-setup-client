<template>
    <div class="user-edit-form">
        <div class="form-wrapper">
            <div class="avatar form-item">
                <div class="img-wrapper" @click="triggerAvatarUpload">
                    <img :src="displayAvatar" alt="">
                    <div class="upload">
                        <i class="iconfont icon-tupian"></i>
                        <span>点击上传</span>
                    </div>
                </div>
                <div class="avatar-label" @click.stop="cancelAvatarChange" v-if="hasNewAvatar && !isSubmitted">
                    <span>取消修改</span>
                </div>
                <div class="avatar-label" @click.stop="triggerAvatarUpload" v-else>
                    <span>修改头像</span>
                </div>
                <div class="avatar-upload">
                    <input type="file" accept="image/*" class="file-input" ref="fileUploadRef"
                        @change="handleAvatarChange">
                </div>

            </div>

            <div class="nickname form-item">
                <ao-input v-model="formData.nickname" placeholder="请输入昵称" :rules="nicknameRules" ref="nicknameRef">
                    <template #icon>
                        <i class="iconfont icon-yonghu"></i>
                    </template>
                </ao-input>
            </div>
            <div class="bio form-item">
                <ao-textarea v-model="formData.bio" placeholder="请输入个人简介" />
            </div>
            <div class="gender form-item">
                <div class="gender-radio">
                    <div class="radio-label">
                        请选择性别：
                    </div>
                    <ao-radio-group :options="radioOptions" v-model="formData.gender" />
                </div>
            </div>
            <div class="city form-item">
                <ao-city-selector :items="{ province: true, city: true }" v-model="formData.city"
                    ref="citySelectorRef" />
            </div>
            <div class="career form-item">
                <ao-input v-model="formData.career" placeholder="请输入职业">
                    <template #icon>
                        <span><i class="iconfont icon-yinhangkarenzheng"></i></span>
                    </template>
                </ao-input>
            </div>
        </div>
        <div class="submit-button">
            <button type="button" @click="handleSubmit">提交修改</button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import AoInput from '@/components/common/AoInput.vue'
import AoRadioGroup from '@/components/common/AoRadioGroup.vue'
import AoTextarea from '@/components/common/AoTextarea.vue'
import AoCitySelector from '@/components/common/AoCitySelector.vue'
import message from '../../utils/message'
import { useUserInfoStore } from '@/stores/user';

const userStore = useUserInfoStore()
const emit = defineEmits(['submit', 'upload-avatar'])

// 头像相关
const fileUploadRef = ref(null)
const uploadedFile = ref(null)
const newAvatarUrl = ref('') // 存储新上传的头像URL
const isSubmitted = ref(false) // 标记是否已提交

// 计算属性：判断是否有新头像
const hasNewAvatar = computed(() => {
    return !!newAvatarUrl.value && !isSubmitted.value
})

// 计算属性：显示的头像（优先显示新头像）
const displayAvatar = computed(() => {
    return newAvatarUrl.value || formData.avatar
})

// 组件引用
const nicknameRef = ref(null)
const citySelectorRef = ref(null)

// 性别选项
const radioOptions = ref([
    { label: '男', value: 1 },
    { label: '女', value: 0 }
])

// 昵称校验规则
const nicknameRules = [
    {
        validator: (value) => {
            if (!value || value.trim() === '') {
                return '昵称不能为空'
            }
            if (value.length < 2) {
                return '昵称至少2个字符'
            }
            if (value.length > 20) {
                return '昵称最多20个字符'
            }
            return true
        },
        trigger: 'input'
    }
]

// 表单数据
const formData = reactive({
    avatar: '',
    nickname: '',
    bio: '',
    gender: 0,
    city: { province: '', city: '' },
    career: ''
})

// 数据初始化标志
const isDataInitialized = ref(false)

const updateFormData = (userData) => {
    formData.avatar = userData.avatar || ''
    formData.nickname = userData.nickname || ''
    formData.bio = userData.bio || ''
    formData.gender = userData.gender || 0
    formData.career = userData.career || ''
    // 处理城市数据
    formData.city = {
        province: userData.province ,
        city: userData.city
    }
    // 重置新头像URL和提交状态
    newAvatarUrl.value = ''
    isSubmitted.value = false
}

// 监听 userData 变化，更新表单数据
watch(() => userStore.userData, (newUserData) => {
    if (newUserData && newUserData.uid && !isDataInitialized.value) {
        updateFormData(newUserData)
        isDataInitialized.value = true
    }
}, { immediate: true, deep: true })

// 触发头像上传
const triggerAvatarUpload = () => {
    // 如果未提交，触发文件选择
    fileUploadRef.value?.click()
}

// 处理头像变化
const handleAvatarChange = (e) => {
    if (isSubmitted.value) return // 如果已提交，不允许修改

    const file = e.target.files[0]
    if (file) {
        // 验证文件类型
        if (!file.type.startsWith('image/')) {
            alert('请上传图片文件')
            return
        }

        // 验证文件大小 (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('图片大小不能超过5MB')
            return
        }

        uploadedFile.value = file

        // 创建本地预览
        const reader = new FileReader()
        reader.onload = (e) => {
            newAvatarUrl.value = e.target.result
        }
        reader.readAsDataURL(file)

        // 通知父组件上传文件
        emit("upload-avatar", file)
    }
}

// 取消头像修改
const cancelAvatarChange = () => {
    if (isSubmitted.value) return // 如果已提交，不允许取消

    newAvatarUrl.value = ''
    uploadedFile.value = null
    if (fileUploadRef.value) {
        fileUploadRef.value.value = ''
    }
}

// 更新头像URL（由父组件调用）
const updateAvatarUrl = (url) => {
    if (url && !isSubmitted.value) {
        newAvatarUrl.value = url
    }
}

// 提交表单
const handleSubmit = async () => {
    // 校验昵称
    const nicknameValid = nicknameRef.value?.validate()

    if (!nicknameValid) {
        message.warn("请填写正确格式昵称!")
        return
    }

    await submitFormData()
}

// 提交表单数据
const submitFormData = async () => {
    const submitData = {
        avatar: newAvatarUrl.value || formData.avatar, // 使用新头像URL或原头像
        nickname: formData.nickname,
        bio: formData.bio,
        gender: formData.gender,
        city: formData.city.city,
        province: formData.city.province,
        career: formData.career
    }

    console.log('提交数据:', submitData)

    // 标记为已提交状态
    isSubmitted.value = true

    // 如果有新头像，更新表单中的avatar为新的URL
    if (newAvatarUrl.value) {
        formData.avatar = newAvatarUrl.value
    }

    emit('submit', submitData)
}

// 提交成功后重置状态（由父组件调用）
const onSubmitSuccess = () => {
    // 提交成功后，如果有新头像，将其设置为正式头像，并重置状态
    if (newAvatarUrl.value) {
        formData.avatar = newAvatarUrl.value
        newAvatarUrl.value = ''
    }
    isSubmitted.value = false
}

// 提交失败后重置状态（由父组件调用）
const onSubmitFailed = () => {
    // 提交失败，重置提交状态，允许重新修改
    isSubmitted.value = false
}

// 重置表单
const resetForm = () => {
    updateFormData(userStore.userData)
    if (citySelectorRef.value) {
        citySelectorRef.value.reset()
    }
}

// 暴露方法给父组件
defineExpose({
    resetForm,
    updateAvatarUrl,
    cancelAvatarChange,
    onSubmitSuccess,
    onSubmitFailed
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/user/_user-edit-form.scss' as *;
</style>