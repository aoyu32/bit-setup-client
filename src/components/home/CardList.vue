<template>
    <div class="card-list">
        <div class="card-header">
            <div class="header-content">
                <h3 class="card-title">{{ cardApp.label }}</h3>
                <div class="title-underline"></div>
            </div>
            <div class="item-badge">{{ cardApp.appList.length }}</div>
        </div>
        <div class="card-content" ref="scrollContainer">
            <div 
                class="list-item" 
                v-for="(item, index) in cardApp.appList" 
                :key="index"
                @click="handleItemClick(item)"
            >
                <div class="item-left">
                    <div class="item-avatar">
                        <img :src="item.img" :alt="item.name" />
                        <div class="avatar-ring"></div>
                    </div>
                    <div class="item-content">
                        <div class="item-title">{{ item.name }}</div>
                        <div class="item-subtitle">{{ item.bio }}</div>
                    </div>
                </div>
                <div class="item-right">
                    <div class="item-arrow">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps(['cardApp'])
const scrollContainer = ref(null)

const handleItemClick = (item) => {
    console.log('点击了应用:', item.name);
}

onMounted(() => {
    console.log(props.cardApp);
    console.log(props.cardApp.appList);
    
    // 确保滚动对齐到完整项目
    if (scrollContainer.value) {
        const itemHeight = 72; // 每个项目的固定高度
        scrollContainer.value.addEventListener('scroll', () => {
            const scrollTop = scrollContainer.value.scrollTop;
            const remainder = scrollTop % itemHeight;
            if (remainder !== 0 && remainder < itemHeight / 2) {
                scrollContainer.value.scrollTo({
                    top: scrollTop - remainder,
                    behavior: 'smooth'
                });
            } else if (remainder > itemHeight / 2) {
                scrollContainer.value.scrollTo({
                    top: scrollTop + (itemHeight - remainder),
                    behavior: 'smooth'
                });
            }
        });
    }
})
</script>

<style lang="scss" scoped>
.card-list {
    flex: 1;
    background: #fefefe;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    overflow: hidden;
 box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;
    
    &:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        border-color: #cbd5e1;
    }

    .card-header {
        padding: 22px 26px 18px;
        background: linear-gradient(to right, #ffffff, #fafbfc);
        border-bottom: 1px solid #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;

        .header-content {
            position: relative;

            .card-title {
                margin: 0;
                font-size: 18px;
                font-weight: 700;
                color: #1a202c;
                letter-spacing: -0.02em;
            }

            .title-underline {
                position: absolute;
                bottom: -6px;
                left: 0;
                width: 32px;
                height: 3px;
                background: linear-gradient(90deg, #3b82f6, #06b6d4);
                border-radius: 2px;
            }
        }

        .item-badge {
            background: linear-gradient(135deg, #eff6ff, #dbeafe);
            color: #1e40af;
            font-size: 12px;
            font-weight: 700;
            padding: 6px 11px;
            border-radius: 12px;
            border: 1px solid rgba(59, 130, 246, 0.2);
            min-width: 28px;
            text-align: center;
        }
    }

    .card-content {
        height: 432px; // 6个完整项目 (72px * 6)
        overflow-y: auto;
        scroll-behavior: smooth;

        /* 滚动条样式 */
        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-track {
            background: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 3px;
            transition: background 0.2s ease;
        }

        &:hover::-webkit-scrollbar-thumb {
            background: rgba(148, 163, 184, 0.4);
        }

        &:hover::-webkit-scrollbar-thumb:hover {
            background: rgba(100, 116, 139, 0.6);
        }

        /* Firefox */
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;

        &:hover {
            scrollbar-color: rgba(148, 163, 184, 0.4) transparent;
        }

        .list-item {
            height: 72px; // 固定高度确保完整显示
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 26px;
            cursor: pointer;
            transition: all 0.2s ease;
            border-bottom: 1px solid transparent;
            position: relative;

            &:not(:last-child) {
                border-bottom-color: #f8fafc;
            }

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 32px;
                background: linear-gradient(135deg, #3b82f6, #06b6d4);
                border-radius: 0 4px 4px 0;
                transition: width 0.2s ease;
            }

            &:hover {
                background: rgba(59, 130, 246, 0.02);
                border-bottom-color: rgba(59, 130, 246, 0.1);

                &::before {
                    width: 4px;
                }

                .avatar-ring {
                    opacity: 1;
                    transform: scale(1);
                }

                .item-title {
                    color: #1d4ed8;
                }

                .item-arrow {
                    opacity: 1;
                    transform: translateX(0);
                    color: #3b82f6;
                }
            }

            &:active {
                transform: scale(0.99);
                background: rgba(59, 130, 246, 0.04);
            }

            .item-left {
                display: flex;
                align-items: center;
                flex: 1;
                min-width: 0;

                .item-avatar {
                    position: relative;
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    overflow: hidden;
                    flex-shrink: 0;
                    margin-right: 16px;
                    background: #f8fafc;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .avatar-ring {
                        position: absolute;
                        inset: -2px;
                        border: 2px solid #3b82f6;
                        border-radius: 14px;
                        opacity: 0;
                        transform: scale(0.95);
                        transition: all 0.2s ease;
                    }
                }

                .item-content {
                    flex: 1;
                    min-width: 0;

                    .item-title {
                        margin: 0 0 4px 0;
                        font-size: 15px;
                        font-weight: 600;
                        color: #334155;
                        line-height: 1.3;
                        transition: color 0.2s ease;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .item-subtitle {
                        margin: 0;
                        font-size: 13px;
                        color: #64748b;
                        line-height: 1.4;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }

            .item-right {
                flex-shrink: 0;

                .item-arrow {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #cbd5e1;
                    opacity: 0;
                    transform: translateX(4px);
                    transition: all 0.2s ease;
                    border-radius: 8px;

                    &:hover {
                        background: rgba(59, 130, 246, 0.1);
                    }
                }
            }
        }

        /* 空状态 */
        &:empty::after {
            content: '暂无应用';
            display: flex;
            align-items: center;
            justify-content: center;
            height: 200px;
            color: #94a3b8;
            font-size: 15px;
            font-weight: 500;
        }
    }

    /* 响应式适配 */
    @media (max-width: 768px) {
        border-radius: 16px;

        .card-header {
            padding: 18px 22px 16px;

            .card-title {
                font-size: 17px;
            }

            .item-badge {
                font-size: 11px;
                padding: 5px 9px;
            }
        }

        .card-content {
            height: 360px; // 5个完整项目

            .list-item {
                height: 64px;
                padding: 0 22px;

                .item-left {
                    .item-avatar {
                        width: 40px;
                        height: 40px;
                        margin-right: 14px;
                        border-radius: 10px;

                        .avatar-ring {
                            inset: -1px;
                            border-width: 1px;
                            border-radius: 11px;
                        }
                    }

                    .item-content {
                        .item-title {
                            font-size: 14px;
                            margin-bottom: 3px;
                        }

                        .item-subtitle {
                            font-size: 12px;
                        }
                    }
                }

                .item-right {
                    .item-arrow {
                        width: 28px;
                        height: 28px;

                        svg {
                            width: 14px;
                            height: 14px;
                        }
                    }
                }
            }
        }
    }
}
</style>