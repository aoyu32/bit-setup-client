<template>
    <div class="ao-image-upload">
        <input ref="fileInput" type="file" class="file-input" accept="image/*" @change="handleFileChange" />

        <!-- 无图片状态 -->
        <div v-if="!previewUrl" class="upload-placeholder" @click="triggerFileInput">
            <div class="placeholder-icon">
                <i class="iconfont icon-picture"></i>
            </div>
            <span class="upload-hint">{{ placeholder }}</span>
        </div>

        <!-- 有图片状态 -->
        <div v-else class="image-container">
            <div class="image-preview" @click="triggerFileInput">
                <img :src="previewUrl" alt="preview" />
            </div>
            <button class="delete-btn" @click="removeImage" title="删除图片">
                <svg viewBox="0 0 1024 1024" width="16" height="16">
                    <path
                        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m165.4 618.2l-66-0.3L512 563.4l-99.3 118.4-66.1 0.3c-4.4 0-8-3.5-8-8 0-1.9 0.7-3.7 1.9-5.2l130.1-155L340.5 359c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1 0.3L512 464.6l99.3-118.4 66-0.3c4.4 0 8 3.5 8 8 0 1.9-0.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
                        fill="currentColor" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const fileInput = ref(null)
const previewUrl = ref('')

const props = defineProps({
    imageUrl: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: '点击上传图片'
    }
})

const emit = defineEmits(['file-selected', 'file-removed'])

watch(() => props.imageUrl, (newUrl) => {
    previewUrl.value = newUrl
}, { immediate: true })

const triggerFileInput = () => {
    fileInput.value.click()
}

const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        emit('file-selected', file)
    }
}

const removeImage = () => {
    previewUrl.value = ''
    fileInput.value.value = ''
    emit('file-removed')
}

onUnmounted(() => {
    if (previewUrl.value && previewUrl.value.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl.value)
    }
})
</script>

<style scoped lang="scss">
.ao-image-upload {
    width: 100%;

    .file-input {
        display: none;
    }

    // 无图片状态
    .upload-placeholder {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border: 1px dashed #d9d9d9;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        background-color: #fafafa;

        &:hover {
            border-color: #4d90fe;
            background-color: #f5f9ff;
        }

        .iconfont {
            font-size: 24px;
            color: #999;
        }

        .upload-hint {
            font-size: 14px;
            color: #666;
        }
    }

    // 有图片状态
    .image-container {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px;
        border: 1px solid #e8e8e8;
        border-radius: 8px;
        background-color: #fff;

        .image-preview {
            width: 100px;
            height: 60px;
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;
            flex-shrink: 0;
            transition: opacity 0.2s ease;

            &:hover {
                opacity: 0.8;
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }
        }

        .delete-btn {
            width: 32px;
            height: 32px;
            border: none;
            background-color: transparent;
            color: #999;
            border-radius: 6px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            margin-left: auto;

            &:hover {
                background-color: #fff1f0;
                color: #ff4d4f;
            }

            svg {
                display: block;
            }
        }
    }
}
</style>