<template>
    <div class="comment-input">
        <!-- 头像 -->
        <div class="avatar" v-if="isShowAvatar">
            <img :src="avatar" alt="">
        </div>

        <!-- 评论主内容 -->
        <div class="comment-main">
            <div class="textarea-wrapper">
                <!-- 输入框 -->
                <div class="textarea">
                    <textarea v-model="innerValue" placeholder="请和大家一起讨论吧~" ref="textareaRef"
                        @input="handleInput"></textarea>
                </div>

                <!-- 图片预览区 -->
                <div class="img-preview" v-if="imageUrls.length > 0">
                    <div class="img-item" v-for="(img, index) in imageUrls" :key="index">
                        <img :src="img" alt="上传预览图">
                        <!-- 删除按钮 -->
                        <div class="delete-btn" @click="handleDeleteImage(index)">
                            <i class="iconfont icon-shanchu"></i>
                        </div>
                    </div>
                </div>

                <!-- 表情选择器 -->
                <div class="emoji-wrapper" v-if="showEmoji" v-click-out="handleClickOutside">
                    <AoEmoji @input-emoji="handleEmojiInput" />
                </div>

                <!-- 操作区 -->
                <div class="actions">
                    <div class="action-left">
                        <!-- 表情 -->
                        <div class="action-item" @click="showEmoji = !showEmoji">
                            <span><i class="iconfont icon-kuaile"></i></span>
                        </div>

                        <!-- 图片 -->
                        <div class="action-item" @click="triggerFileSelect">
                            <span><i class="iconfont icon-tupian"></i></span>
                            <input type="file" ref="fileInputRef" accept="image/*" multiple style="display: none"
                                @change="handleFileSelect" />
                        </div>
                    </div>

                    <!-- 发布 -->
                    <div class="action-right">
                        <button @click="emitSubmit">发布</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import AoEmoji from '../common/AoEmoji.vue'
import { useCommentStore } from '../../stores/comment'
import message from '../../utils/message'

// ====================== Props & Emits ======================
const props = defineProps({
    modelValue: { type: String, default: '' }, // 父组件传入的绑定值
    isShowAvatar: { type: Boolean, default: true },
    avatar: {
        type: String,
        default: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=TechExplorer'
    }
})

const emits = defineEmits(['update:modelValue', 'submit'])

// ====================== 状态管理 ======================
const innerValue = ref(props.modelValue)
const imageUrls = ref([])
const showEmoji = ref(false)
const textareaRef = ref(null)
const fileInputRef = ref(null)
const commentStore = useCommentStore()

// ====================== 文本输入逻辑 ======================
const adjustHeight = () => {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
}

const handleInput = () => {
    adjustHeight()
    emits('update:modelValue', innerValue.value)
}


const handleClickOutside = () => {
    showEmoji.value = false
}

// 父组件更新时同步内部值
watch(() => props.modelValue, (val) => {
    innerValue.value = val
})

// ====================== 表情输入逻辑 ======================
const handleEmojiInput = (emoji) => {
    // 获取当前光标位置
    const textarea = textareaRef.value
    const startPos = textarea.selectionStart
    const endPos = textarea.selectionEnd

    // 在光标位置插入表情
    const textBefore = innerValue.value.substring(0, startPos)
    const textAfter = innerValue.value.substring(endPos)
    innerValue.value = textBefore + emoji + textAfter

    // 更新父组件的值
    emits('update:modelValue', innerValue.value)

    // 下一帧更新光标位置和高度
    setTimeout(() => {
        const newCursorPos = startPos + emoji.length
        textarea.setSelectionRange(newCursorPos, newCursorPos)
        textarea.focus()
        adjustHeight()
    }, 0)
    showEmoji.value = false
}

// ====================== 图片上传逻辑 ======================
const triggerFileSelect = () => {
    fileInputRef.value.click()
}

const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files)
    for (const file of files) {
        try {
            const resp = await commentStore.fetchUploadImage("app", file)
            if (resp) {
                imageUrls.value.push(resp) // resp为图片URL
            }
        } catch (error) {
            message.error('图片上传失败，请重试')
        }
    }
    // 清空input，避免连续选择同一张图片无效
    e.target.value = ''
}

// ====================== 删除图片逻辑 ======================
const handleDeleteImage = (index) => {
    // 从数组中移除指定索引的图片
    imageUrls.value.splice(index, 1)
}

// ====================== 发布按钮 ======================
const emitSubmit = () => {
    emits('submit', { content: innerValue.value, images: imageUrls.value })
}

// ====================== 生命周期 ======================
onMounted(() => {
    adjustHeight()
})

const clearImage = () => {
    imageUrls.value = []
}

defineExpose({
    clearImage
})

</script>

<style scoped lang="scss">
.comment-input {
    width: 100%;
    display: flex;
    gap: 15px;

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;

        img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .comment-main {
        width: 100%;
        display: flex;
        flex-direction: column;

        .textarea-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            background-color: #f0f2f5e7;
            padding: 15px;
            border-radius: 6px;
            gap: 10px;
            position: relative;

            .textarea {
                textarea {
                    width: 100%;
                    font-size: 14px;
                    line-height: 1.6;
                    color: #333;
                    border-radius: 8px;
                    outline: none;
                    transition: all 0.3s ease;
                    resize: none;
                    overflow: auto;
                    letter-spacing: 0.2px;
                    background: transparent;
                    border: none;

                    &::placeholder {
                        color: #999;
                        opacity: 1;
                    }
                }
            }

            .img-preview {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;

                .img-item {
                    width: 75px;
                    height: 75px;
                    border-radius: 6px;
                    overflow: hidden;
                    position: relative;
                    cursor: pointer;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    // 删除按钮
                    .delete-btn {
                        position: absolute;
                        top: 3px;
                        right: 3px;
                        width: 20px;
                        height: 20px;
                        background-color: rgba(0, 0, 0, 0.6);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        opacity: 0;
                        transition: opacity 0.2s ease-in-out;

                        .iconfont {
                            font-size: 12px;
                            color: #fff;
                        }
                    }

                    // 悬停时显示删除按钮
                    &:hover .delete-btn {
                        opacity: 1;
                    }

                    // 图片悬停效果
                    &:hover img {
                        transform: scale(1.05);
                        transition: transform 0.2s ease-in-out;
                    }
                }
            }

            .actions {
                display: flex;
                justify-content: space-between;

                .action-left {
                    display: flex;
                    gap: 10px;

                    .action-item {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }

                    .iconfont {
                        font-size: 19px;
                        color: rgba(0, 145, 255, 0.66);
                        transition: 0.2s ease-in-out;

                        &:hover {
                            color: rgba(0, 145, 255, 0.888);
                        }
                    }
                }

                .action-right {
                    font-size: 13px;

                    button {
                        padding: 3px 7px;
                        border-radius: 3px;
                        color: #ffffff;
                        background-color: rgba(0, 145, 255, 0.66);
                        transition: 0.2s ease-in-out;

                        &:hover {
                            color: #fdfdfdc0;
                            background-color: rgba(0, 145, 255, 0.869);
                            box-shadow: 0 3px 10px rgba(0, 145, 255, 0.869);
                        }
                    }
                }
            }
        }
    }

    .emoji-wrapper {
        position: absolute;
        bottom: 50px;
        left: 15px;
        z-index: 10;
    }
}
</style>