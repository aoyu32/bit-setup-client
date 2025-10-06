<template>
    <div class="ao-file-upload">
        <div class="upload-area" @click="triggerUpload" @dragover.prevent @drop.prevent="handleDrop">
            <input ref="fileInput" type="file" accept=".exe,.msi,.zip,.apk,.dmg,.pkg" @change="handleFileChange"
                style="display: none" />
            <div v-if="!fileInfo" class="upload-placeholder">
                <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="upload-text">点击或拖拽文件到此处上传</p>
                <p class="upload-hint">支持 .exe / .msi / .zip / .apk / .dmg / .pkg 格式</p>
            </div>

            <div v-else class="file-info" @click.stop>
                <div class="file-left">
                    <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <polyline points="13 2 13 9 20 9" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>

                <div class="file-center">
                    <div class="file-name">{{ fileInfo.name }}</div>
                    <div class="file-size">{{ formatFileSize(fileInfo.size) }}</div>
                </div>

                <div class="file-right">
                    <button class="icon-btn edit-btn" @click="triggerUpload" title="修改">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    <button class="icon-btn delete-btn" @click="handleDelete" title="删除">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="3 6 5 6 21 6" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update:file'])

const fileInput = ref(null)
const fileInfo = ref(null)

const allowedExtensions = ['.exe', '.msi', '.zip', '.apk', '.dmg', '.pkg']

const triggerUpload = () => {
    fileInput.value?.click()
}

const validateFile = (file) => {
    const fileName = file.name.toLowerCase()
    const isValid = allowedExtensions.some(ext => fileName.endsWith(ext))

    if (!isValid) {
        alert('仅支持上传应用安装包文件（.exe / .msi / .zip / .apk / .dmg / .pkg）')
        return false
    }
    return true
}

const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && validateFile(file)) {
        // 保存文件信息用于显示
        fileInfo.value = {
            name: file.name,
            size: file.size,
            type: file.type,
            file: file  // 保留原始 File 对象的引用
        }
        emit('update:file', file)
    }
    e.target.value = ''
}

const handleDrop = (e) => {
    const file = e.dataTransfer.files[0]
    if (file && validateFile(file)) {
        // 保存文件信息用于显示
        fileInfo.value = {
            name: file.name,
            size: file.size,
            type: file.type,
            file: file
        }
        emit('update:file', file)
    }
}

const handleDelete = () => {
    fileInfo.value = null
    emit('update:file', null)
}

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

defineExpose({
    handleDelete
})

</script>

<style lang="scss" scoped>
.ao-file-upload {
    width: 100%;
    height: 100%;

    .upload-area {
        border: 2px dashed #d0d7de;
        border-radius: 8px;
        background: #f6f8fa;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            border-color: #0969da;
            background: #f3f6fc;
        }
    }

    .upload-placeholder {
        padding: 20px;
        text-align: center;

        .upload-icon {
            width: 20px;
            height: 20px;
            margin: 0 auto 5px;
            color: #656d76;
        }

        .upload-text {
            font-size: 14px;
            color: #1f2328;
            margin: 0 0 8px;
            font-weight: 500;
        }

        .upload-hint {
            font-size: 12px;
            color: #656d76;
            margin: 0;
        }
    }

    .file-info {
        display: flex;
        align-items: center;
        padding: 16px;
        gap: 12px;

        .file-left {
            flex-shrink: 0;

            .file-icon {
                width: 40px;
                height: 40px;
                color: #0969da;
            }
        }

        .file-center {
            flex: 1;
            min-width: 0;

            .file-name {
                font-size: 14px;
                color: #1f2328;
                font-weight: 500;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 4px;
            }

            .file-size {
                font-size: 12px;
                color: #656d76;
            }
        }

        .file-right {
            display: flex;
            gap: 8px;
            flex-shrink: 0;

            .icon-btn {
                width: 32px;
                height: 32px;
                border: none;
                border-radius: 6px;
                background: transparent;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;

                svg {
                    width: 18px;
                    height: 18px;
                }

                &.edit-btn {
                    color: #656d76;

                    &:hover {
                        background: #e7eef6;
                        color: #0969da;
                    }
                }

                &.delete-btn {
                    color: #656d76;

                    &:hover {
                        background: #ffebe9;
                        color: #cf222e;
                    }
                }
            }
        }
    }
}
</style>