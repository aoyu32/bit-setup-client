<template>
    <div class="submit-form">
        <div class="form-top">
            <div class="app-name">
                <div class="form-label">
                    应用名称 <span class="required">*</span>
                </div>
                <div class="form-content">
                    <AoInput v-model="formData.appName" placeholder="请输入应用名称" ref="appNameRef" />
                </div>
            </div>

            <div class="app-category">
                <div class="form-label">
                    应用分类 <span class="required">*</span>
                </div>
                <div class="form-content">
                    <AoSelector v-model="formData.primaryCategory" :options="primary" labelKey="categoryName"
                        valueKey="id" placeholder="选择主分类" @change="handleCategoryChange" />
                    <AoSelector v-model="formData.secondaryCategory" :options="secondary" labelKey="categoryName"
                        valueKey="id" placeholder="选择子分类" />
                </div>
            </div>

            <div class="app-version">
                <div class="form-label">
                    应用版本 <span v-if="isDeveloper" class="required">*</span>
                </div>
                <div class="form-content">
                    <AoInput v-model="formData.version" placeholder="例如: 1.0.0" :rules="[
                        { validator: (val) => val ? true : '请输入应用版本', trigger: 'input' }
                    ]" ref="versionRef" />
                </div>
            </div>

            <div class="app-size">
                <div class="form-label">
                    应用大小 <span v-if="isDeveloper" class="required">*</span>
                </div>
                <div class="form-content">
                    <AoInput v-model="formData.size" placeholder="例如: 50MB" :rules="[
                        { validator: (val) => val ? true : '请输入应用大小', trigger: 'input' }
                    ]" ref="sizeRef" />
                </div>
            </div>

            <div class="app-fee">
                <div class="form-label">
                    付费制度 <span v-if="isDeveloper" class="required">*</span>
                </div>
                <div class="form-content">
                    <AoSelector v-model="formData.feeType" :options="feeTypes" valueKey="value" label="label"
                        placeholder="选择付费制度" />
                </div>
            </div>
        </div>

        <div class="form-center">
            <div class="app-official">
                <div class="form-label">
                    官网地址
                </div>
                <div class="form-content">
                    <AoInput v-model="formData.officialUrl" placeholder="请输入官网地址" />
                </div>
            </div>

            <div class="app-download">
                <div class="form-label">
                    下载地址
                </div>
                <div class="form-content">
                    <AoInput v-model="formData.downloadUrl" placeholder="请输入下载地址" />
                </div>
            </div>
        </div>

        <div class="form-bottom">
            <div class="bio-file">
                <div class="app-bio">
                    <div class="form-label">
                        应用简述 <span class="required">*</span>
                    </div>
                    <div class="form-content">
                        <AoTextarea v-model="formData.bio" placeholder="请输入应用简述" />
                    </div>
                </div>

            </div>
            <div class="icon-file-upload">
                <slot name="app-icon"></slot>
                <slot name="file-upload"></slot>
            </div>
            <div class="screenshot">
                <div class="app-interface">
                    <div class="form-label">
                        应用截图 <span v-if="isDeveloper" class="required">*</span>
                    </div>
                    <div class="form-content">
                        <AoUpload v-for="(item, index) in 3" @file-selected="(file) => handleScreenshot(file, index)"
                            @file-removed="handleFileRemove(index)" :imageUrl="formData.screenshots[index]" />
                    </div>
                </div>
            </div>
            <slot name="prove"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import AoUpload from '@/components/common/AoUpload.vue'
import AoSelector from '@/components/common/AoSelector.vue'
import AoInput from '../common/AoInput.vue'
import AoTextarea from '../common/AoTextarea.vue'
import message from '../../utils/message'
import { useSubmitStore } from '../../stores/submit'
import { useCategoryStore } from '@/stores/category'

// 接收父组件的 v-model
const modelValue = defineModel({ type: Object, default: () => ({}) })

const submitStore = useSubmitStore()
const categoryStore = useCategoryStore()

const props = defineProps({
    isDeveloper: { type: Boolean, default: false }
})

const formData = ref({
    appName: '',
    primaryCategory: '',
    secondaryCategory: '',
    version: '',
    size: '',
    feeType: '',
    officialUrl: '',
    downloadUrl: '',
    bio: '',
    screenshots: [null, null, null]
})

// 表单引用
const appNameRef = ref(null)
const versionRef = ref(null)
const sizeRef = ref(null)

const primary = computed(() => {
    return categoryStore.fatherList
})

const secondary = computed(() => {
    return categoryStore.childList
})

const feeTypes = [
    { label: '免费', value: 'free' },
    { label: '免费试用', value: 'trial' },
    { label: '一次性付费', value: 'one_time' },
    { label: '订阅制', value: 'subscription' },
    { label: '内购制', value: 'in_app_purchase' },
    { label: '开源', value: 'open_source' }
];

// 处理截图上传
const handleScreenshot = async (file, index) => {
    const resp = await submitStore.fetchUploadImg(file)
    if (resp) {
        formData.value.screenshots[index] = resp
    }

}

const handleFileRemove = (index) => {
    formData.value.screenshots[index] = null
}

onMounted(() => {
    categoryStore.fetchFaterList(1)
})

const handleCategoryChange = async (value) => {
    await categoryStore.fetchChildList(value)

}

// 验证表单
const validateForm = () => {
    let isValid = true

    // 验证必填项
    if (!formData.value.appName) {
        message.warn("请输入应用名称")
        isValid = false
    }

    if (!formData.value.primaryCategory || !formData.value.secondaryCategory) {
        message.warn('请选择应用分类')
        isValid = false
    }

    if (!formData.value.bio) {
        message.warn('请输入应用简述')
        isValid = false
    }

    // 开发者额外验证
    if (props.isDeveloper) {
        if (!formData.value.version) {
            versionRef.value?.validate()
            isValid = false
        }
        if (!formData.value.size) {
            sizeRef.value?.validate()
            isValid = false
        }
        if (!formData.value.feeType) {
            message.warn('请选择付费制度')
            isValid = false
        }
        if (!formData.value.screenshots.some(s => s !== null)) {
            message.warn('请至少上传一张应用截图')
            isValid = false
        }
    }

    return isValid
}

// 检查整个表单是否为空
// 检查整个表单是否为空
const isFormEmpty = () => {
    const data = formData.value

    // 检查 screenshots 是否全部为 null
    const allScreenshotsEmpty = data.screenshots.every(item => item === null)

    // 遍历除 screenshots 和 uid 外的所有字段
    const otherFieldsEmpty = Object.entries(data)
        .filter(([key]) => key !== 'screenshots' && key !== 'uid')  // ← 添加 uid 的过滤
        .every(([_, value]) => value === '' || value === null || value === undefined)

    return allScreenshotsEmpty && otherFieldsEmpty
}


// 获取表单数据
const getFormData = () => {
    return { ...formData.value }
}

// 重置表单
const resetForm = () => {
    formData.value = {
        appName: '',
        primaryCategory: '',
        secondaryCategory: '',
        version: '',
        size: '',
        feeType: '',
        officialUrl: '',
        downloadUrl: '',
        bio: '',
        screenshots: [null, null, null]
    }
}

// 设置表单数据（用于加载草稿）
const setFormData = (data) => {
    if (!data) return
    
    formData.value = {
        appName: data.appName || '',
        primaryCategory: data.primaryCategory || '',
        secondaryCategory: data.secondaryCategory || '',
        version: data.version || '',
        size: data.size || '',
        feeType: data.feeType || '',
        officialUrl: data.officialUrl || '',
        downloadUrl: data.downloadUrl || '',
        bio: data.bio || '',
        screenshots: data.screenshots || [null, null, null]
    }
    
    // 如果有主分类，需要加载对应的子分类列表
    if (data.primaryCategory) {
        categoryStore.fetchChildList(data.primaryCategory)
    }
}


defineExpose({
    validateForm,
    getFormData,
    resetForm,
    isFormEmpty,
    setFormData
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/submit/_submit-form.scss' as *;

.required {
    color: #ff4d4f;
    margin-left: 2px;
}
</style>