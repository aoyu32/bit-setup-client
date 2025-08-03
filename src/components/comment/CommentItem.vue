<template>
    <div class="comment-item">
        <div class="comment-item-top">
            <div class="user-avatar">
                <img src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=TechExplorer" alt="">
            </div>
            <div class="user-info">
                <div class="name">
                    <span>科技探索者</span>
                </div>
                <div class="level">
                    <span>无敌新手</span>
                    <span>Lv0</span>
                    <span>VIP</span>
                </div>
            </div>
        </div>
        <div class="comment-item-bottom">
            <div class="comment-main">
                <div class="comment-content">
                    <div class="content">
                        <p v-if="!isEdit">嘿嘿，给我点个赞呗😀</p>
                        <div class="edit-comment" v-else>
                            <textarea name="" id=""></textarea>
                        </div>
                    </div>
                    <div class="comment-actions">
                        <div class="action-left">
                            <div class="action-item date">
                                <span>2025-09-01 09:54</span>
                            </div>
                            <div class="action-item like">
                                <span><i class="iconfont icon-dianzan"></i></span>
                                <span>1000</span>
                            </div>
                            <div class="action-item reply-button" @click="isReplying = !isReplying">
                                <span><i class="iconfont icon-pinglun"></i></span>
                                <span>{{ isReplying ? '取消回复' : '回复' }}</span>
                            </div>
                        </div>
                        <div class="action-right">
                            <div class="more" @click="isShowMoreMenu = !isShowMoreMenu">
                                <span><i class="iconfont icon-ellipsis-vertical"></i></span>
                            </div>
                            <div class="more-menu" v-show="isShowMoreMenu">
                                <div class="report" v-if="!isMyComment">
                                    <span><i class="iconfont icon-warning"></i></span>
                                    <span>举报</span>
                                </div>
                                <div class="manage menu-item" v-else>
                                    <div class="edit">
                                        <span><i class="iconfont icon-edit"></i></span>
                                        <span>编辑</span>
                                    </div>
                                    <div class="delete">
                                        <span><i class="iconfont icon-delete"></i></span>
                                        <span>删除</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="reply-input" v-if="isReplying">
                    <CommentInput :isShowAvatar="false" />
                </div>
                <div class="reply-content">
                    <CommentReplyItem />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import CommentInput from './CommentInput.vue'
import CommentReplyItem from './CommentReplyItem.vue'
const isEdit = ref(false)
const isMyComment = ref(false)
const isShowMoreMenu = ref(true)
const isReplying = ref(false)

</script>
<style lang="scss" scoped>
.comment-item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .comment-item-top {
        width: 100%;
        display: flex;
        gap: 15px;

        .user-avatar {
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

        .user-info {
            @include flex(l, n, c);
            gap: 5px;

            .name {
                @include c-t {
                    color: color(c-g9);
                }

                span {
                    font-size: 14px;
                }
            }

            .level {
                @include flex(c, c);
                gap: 5px;

                span {
                    font-size: 10px;
                    padding: 2px 8px;
                    @include b-r(3);

                    @include c-t {
                        colo: color(c-g9);
                        background-color: color(c-g1);
                    }

                    &:first-child {
                        background: #e6f7ff;
                        color: #1890ff;
                    }

                    &:nth-child(2) {
                        background: #fff2e8;
                        color: #fa8c16;
                    }

                    &:last-child {
                        background: #f6ffed;
                        color: #52c41a;
                    }

                }
            }
        }
    }

    .comment-item-bottom {
        padding-left: calc(40px + 15px);
        @include wh;
        font-size: 15px;

        .edit-comment {
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 8px;

            textarea {
                // 基础样式
                width: 100%;
                height: 100%;
                padding: 15px;
                max-height: 200px;
                font-size: 14px;
                line-height: 1.6;
                color: #333;
                border-radius: 8px;
                background-color: #fff;
                border: 1px solid #e0e0e0;

                outline: none;
                transition: all 0.3s ease;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                resize: none;


                letter-spacing: 0.2px;

                // 占位符样式
                &::placeholder {
                    color: #999;
                    opacity: 1;
                }

                /* 聚焦状态 */
                &:focus {
                    border-color: #4d90fe;
                }

            }
        }

        .comment-content {
            margin-bottom: 20px;
        }

        .content {
            margin: 10px 0;
            font-size: 15px;
            @include wh;
        }

        .reply-input {
            @include wh;
            margin: 20px 0;
        }

        .comment-actions {
            @include wh;
            @include flex(n, s-b);

            .action-left {
                @include flex(c, c);
                gap: 20px;
                font-size: 12px;

                .action-item {
                    @include flex(c, c);
                    gap: 6px;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;

                    span {
                        @include flex(c, c);
                    }
                }

                .like {

                    &:hover {
                        @include c-t {
                            color: color(c-s-light);
                        }
                    }
                }

                .reply-button {
                    &:hover {
                        @include c-t {
                            color: color(c-p-lighter);
                        }
                    }
                }

                @include c-t {
                    color: color(c-g9, 0.5);
                }
            }

            .action-right {
                @include flex(c, c);
                position: relative;

                .iconfont {
                    font-size: 14px;

                    @include c-t {
                        color: color(c-g9, 0.5);
                    }
                }

                .more {
                    cursor: pointer;

                    .iconfont {
                        &:hover {
                            @include c-t {
                                color: color(c-p-dark);
                            }
                        }
                    }
                }

                .more-menu {
                    @include wh(90, n);
                    padding: 5px 0;
                    position: absolute;
                    right: 10px;
                    top: 20px;
                    @include b-r($b-r);

                    @include c-t {
                        background-color: color(c-g1);
                    }

                    .menu-item {
                        @include flex(c, c, c);
                        gap: 5px;
                        @include wh;
                    }

                    .edit,
                    .delete,
                    .report {
                        padding: 5px;
                        @include wh;
                        @include flex(c, c);
                        transition: all 0.3s ease-in-out;
                        cursor: pointer;
                        gap: 5px;

                        @include c-t {
                            color: color(c-g7);
                        }

                        .iconfont {
                            font-size: 13px;
                        }

                        &:hover {
                            @include c-t {
                                background-color: color(c-g2);
                            }
                        }

                    }
                }
            }
        }

    }


}
</style>