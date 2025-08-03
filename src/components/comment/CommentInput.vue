<template>
    <div class="comment-input">
        <div class="avatar" v-if="isShowAvatar">
            <img src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=TechExplorer" alt="">
        </div>
        <div class="comment-main">
            <div class="textarea-wrapper">
                <div class="textarea">
                    <textarea name="" id="" placeholder="请和大家一起讨论吧~" ref="textareaRef" @input="adjustHeight"></textarea>
                </div>
                <div class="img-preview">
                    <div class="img-item">
                        <!-- <img src="https://pic.code-nav.cn/post_cover/1759828016537657346/thumbnail/WIRSHD3Dh1h89WJk.png"
                            alt=""> -->

                    </div>
                    <div class="emoji-wrapper" v-if="showEmoji">
                        <AoEmoji />
                    </div>
                </div>
                <div class="actions">
                    <div class="action-left">
                        <div class="action-item" @click="showEmoji = !showEmoji">
                            <span>
                                <i class="iconfont icon-kuaile"></i>
                            </span>
                        </div>
                        <div class="action-item">
                            <span><i class="iconfont icon-tupian"></i></span>
                        </div>
                    </div>
                    <div class="action-right">
                        <button>发布</button>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import AoEmoji from '../common/AoEmoji.vue'
const textareaRef = ref(null)
const showEmoji = ref(false)
const props = defineProps(['isShowAvatar'])
const adjustHeight = () => {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
}

onMounted(() => {
    adjustHeight()
})

</script>
<style scoped lang="scss">
.comment-input {
    width: 100%;
    height: 100%;
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
        height: 100%;
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
                width: 100%;
                height: 100%;
                overflow: hidden;

                textarea {
                    // 基础样式
                    width: 100%;
                    height: 100%;
                    max-height: 200px;
                    font-size: 14px;
                    line-height: 1.6;
                    color: #333;
                    border-radius: 8px;
                    outline: none;
                    transition: all 0.3s ease;
                    resize: none;
                    overflow: auto;
                    letter-spacing: 0.2px;

                    // 占位符样式
                    &::placeholder {
                        color: #999;
                        opacity: 1;
                    }

                }
            }

            .img-preview {
                width: 100%;
                display: flex;
                gap: 20px;
                position: relative;
                flex-wrap: wrap;

                .img-item {
                    max-height: 75px;
                    aspect-ratio: 1/1;
                    border-radius: 6px;

                    img {
                        border-radius: 8px;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

            }

            .actions {
                width: 100%;
                display: flex;
                justify-content: space-between;


                .action-left {
                    display: flex;
                    gap: 10px;

                    .action-item {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding-top: 2px;
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
        bottom: 0;
    }
}
</style>