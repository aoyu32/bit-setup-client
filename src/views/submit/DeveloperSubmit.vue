<template>
    <div class="developer-submit">
        <div class="developer-form">
            <SubmitForm ref="formRef" :isDeveloper="true" v-model="developFormData">
                <template #app-icon>
                    <div class="app-icon">
                        <div class="form-label">
                            应用图标 <span class="required">*</span>
                        </div>
                        <div class="form-content">
                            <AoUpload @file-selected="(file) => handleAppIcon(file)" :imageUrl="appIcon" />
                        </div>
                    </div>
                </template>
                <template #file-upload>
                    <div class="app-file-upload">
                        <div class="form-label">
                            文件上传 <span class="required">*</span>
                        </div>
                        <div class="form-content">
                            <AoFileUpload @update:file="handleFileUpload" ref="fileUploadRef" />
                        </div>
                    </div>
                </template>
                <template #prove>
                    <div class="app-prove">
                        <div class="form-label">
                            开发者凭证 <span class="required">*</span>
                        </div>
                        <div class="form-content">
                            <AoUpload v-for="(item, index) in 3" @file-selected="(file) => handleProve(file, index)"
                                @file-removed="handleFileRemove(index)" :imageUrl="proveFiles[index]" />
                        </div>
                    </div>
                </template>
            </SubmitForm>
        </div>
        <div class="submit-button">
            <div class="save">
                <button @click="handleSave">暂存</button>
            </div>
            <div class="submit">
                <button @click="handleSubmit">提交</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SubmitForm from '../../components/submit/SubmitForm.vue'
import AoUpload from '@/components/common/AoUpload.vue'
import AoFileUpload from '@/components/common/AoFileUpload.vue'
import { useSubmitStore } from '../../stores/submit'
const submitStore = useSubmitStore()

const formRef = ref(null)
const fileUploadRef = ref(null)
const appIcon = ref(null)
const appFile = ref(null)
const proveFiles = ref([null, null, null])
const developFormData = ref(null)
// 处理应用图标
const handleAppIcon = async (file) => {
    const resp = await submitStore.fetchUploadImg(file)
    if (resp) {
        appIcon.value = resp
    }
}

// 处理文件上传
const handleFileUpload = async (fileInfo) => {
    console.log("上传的文件", fileInfo);
    const resp = await submitStore.fetchUploadFile(fileInfo)
    if (resp) {
        appFile.value = resp
    }

}

// 处理凭证上传
const handleProve = async (file, index) => {
    const resp = await submitStore.fetchUploadImg(file)
    if (resp) {
        proveFiles.value[index] = resp
    }
}

// 暂存
const handleSave = async () => {
    console.log(formRef.value.isFormEmpty());

    if (formRef.value.isFormEmpty()) {
        if (!appIcon.value && !appFile.value && !proveFiles.value.every(item => item === null)) {
            return
        }
    }
    const formData = formRef.value.getFormData()

    const submitData = {
        ...formData,
        iconUrl: appIcon.value,
        fileUrl: appFile.value,
        proves: proveFiles.value,
        isDraft: true
    }

    console.log('提交数据:', submitData)
    await submitStore.fetchSubmitDevelop(submitData)

}

// 提交
const handleSubmit = async () => {
    // 验证表单
    if (!formRef.value.validateForm()) {
        return
    }

    // 验证开发者额外必填项
    if (!appIcon.value) {
        alert('请上传应用图标')
        return
    }

    if (!appFile.value) {
        alert('请上传应用安装包')
        return
    }

    if (!proveFiles.value.some(f => f !== null)) {
        alert('请至少上传一张开发者凭证')
        return
    }

    const formData = formRef.value.getFormData()

    const submitData = {
        ...formData,
        iconUrl: appIcon.value,
        fileUrl: appFile.value,
        proves: proveFiles.value.filter(f => f !== null),
        isDraft: false
    }


    console.log('提交数据:', submitData)
    const resp = await submitStore.fetchSubmitDevelop(submitData)
    if (resp) {
        // 重置表单
        formRef.value.resetForm()
        appIcon.value = null
        appFile.value = null
        proveFiles.value = [null, null, null]
        fileUploadRef.handleDelete()
    }

}
</script>
<style scoped lang="scss">
@use '@/assets/styles/submit/_developer-submit.scss' as *;

.required {
    color: #ff4d4f;
    margin-left: 2px;
}
</style>