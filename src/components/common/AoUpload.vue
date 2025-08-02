<template>
    <div class="ao-upload">
        <div class="upload-wrapper" @click="triggerFileInput">
            <input ref="fileInput" type="file" class="file-input" accept="image/*" @change="handleFileChange">

            <div v-if="!previewUrl" class="upload-area">
                <i class="iconfont icon-picture"></i>
            </div>

            <div v-else class="preview-area">
                <img :src="previewUrl" class="preview-image">
                <div class="preview-overlay">
                    <button class="replace-btn" @click.stop="triggerFileInput">更换</button>
                    <button class="remove-btn" @click.stop="removeImage">删除</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const fileInput = ref(null);
const previewUrl = ref('');

const triggerFileInput = () => {
    fileInput.value.click();
};

const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        previewUrl.value = URL.createObjectURL(file);
    }
};

const removeImage = () => {
    previewUrl.value = '';
    fileInput.value.value = '';
};
</script>

<style scoped lang="scss">
.ao-upload {
    width: 100%;
    height: 100%;
    min-height: 120px;


    .upload-wrapper {
        width: 100%;
        height: 100%;
        border: 2px dashed #ddd;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
        background-color: #f9f9f9;

        &:hover {
            border-color: #4d90fe;
            background-color: #f0f7ff;
        }

        .file-input {
            display: none;
        }

        .upload-area {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #666;

            .upload-icon {
                width: 48px;
                height: 48px;
                fill: #999;
                margin-bottom: 12px;
            }

            .upload-text {
                font-size: 16px;
                font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
            }
        }

        .preview-area {
            width: 100%;
            height: 100%;
            position: relative;

            .preview-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .preview-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.5);
                padding: 10px;
                display: flex;
                justify-content: center;
                gap: 10px;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            &:hover .preview-overlay {
                opacity: 1;
            }

            .replace-btn,
            .remove-btn {
                padding: 6px 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.2s ease;
            }

            .replace-btn {
                background-color: #4d90fe;
                color: white;

                &:hover {
                    background-color: #3a7de0;
                }
            }

            .remove-btn {
                background-color: #ff4d4f;
                color: white;

                &:hover {
                    background-color: #e64244;
                }
            }
        }
    }
}
</style>