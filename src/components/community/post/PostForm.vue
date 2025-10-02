<template>
    <div class="post-form">
        <div class="form-header">
            <div class="title-input">
                <AoInput :placeholder="postLabel + '的标题'" v-model="formData.title" type="text">
                    <template #icon>
                        <span> <i :class="['iconfont', postTagIcon]" style="font-size: 20px;"></i></span>
                    </template>
                </AoInput>
            </div>
            <div class="tag">
                <AoSelctor :options="options" valueKey="value" labelKey="label" v-model="formData.category" />
            </div>
        </div>

        <!-- topic/help 分类 -->
        <div class="form-main-th" v-if="formData.category === 'topic' || formData.category === 'help'">
            <div class="summary">
                <AoTextarea :placeholder="'请输入' + postLabel + '的帖子摘要'" v-model="formData.summary" />
            </div>
            <div class="upload-img">
                <div class="upload-list">
                    <AoImageUpload v-for="(img, index) in formData.images" :key="index"
                        @file-selected="(file) => handlePreviewImage(file, index)"
                        @file-removed="() => handleFileRemoved(index)" :image-url="formData.images[index]"
                        placeholder="点击上传预览图" />
                    <div v-if="formData.images.length < maxCount" class="add-upload-btn" @click="addUpload">
                        + 添加
                    </div>
                </div>
            </div>
        </div>

        <!-- 其它分类 -->
        <div class="form-main-jw" v-if="formData.category === 'course' || formData.category === 'article'">
            <div class="summary">
                <AoTextarea v-model="formData.summary" />
            </div>
            <div class="upload-img">
                <AoImageUpload @file-selected="handleCoverImage" :image-url="formData.images[0]"
                    @file-removed="() => handleFileRemoved(0)" placeholder="点击上传封面" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AoSelctor from '@/components/common/AoSelector.vue'
import AoInput from '../../common/AoInput.vue'
import AoTextarea from '../../common/AoTextarea.vue'
// import AoUpload from '../../common/AoUpload.vue'
import AoImageUpload from '../../common/AoImageUpload.vue'
import { useCommunityStore } from '@/stores/community'
const communityStore = useCommunityStore()

const formData = computed(() => {
    return communityStore.postFormData
})

const postLabel = computed(() => {
    const selectOption = options.value.find(option => option.value === formData.value.category)
    return selectOption ? selectOption.label : null
})

const options = ref([
    { id: 1, label: '话题', value: 'topic' },
    { id: 2, label: '求助', value: 'help' },
    { id: 3, label: '教程', value: 'course' },
    { id: 4, label: '文章', value: 'article' }
])

const postTagIcon = computed(() => {
    if (formData.value.category === 'topic') {
        return 'icon-a-icon_huati'
    }
    if (formData.value.category === 'help') {
        return 'icon-bulb'
    }
    if (formData.value.category === 'course') {
        return 'icon-student'
    }
    if (formData.value.category === 'article') {
        return 'icon-zidian'
    }
})

const maxCount = 9 // 最多9张，按钮会自动消失

const handlePreviewImage = async (file, index) => {

    const resp = await communityStore.fetchUploadPostImg(file)
    formData.value.images[index] = resp
}

const handleFileRemoved = (index) => {
    formData.value.images.splice(index, 1)
}

const addUpload = () => {
    if (formData.value.images.length < maxCount) {
        formData.value.images.push(null)
    }
}

const handleCoverImage = async (file) => {
    console.log(file);

    const resp = await communityStore.fetchUploadPostImg(file)
    if (formData.value.images.length !== 0) {
        formData.value.images = []
    }

    formData.value.images.push(resp)
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/community/post/_post-form.scss' as *;
</style>
