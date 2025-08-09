<template>
    <div class="ao-search">
        <div class="search-container" ref="searchContainer">
            <div class="input-wrapper" :class="{ focus: isShowPanel }">
                <div class="input-left">
                    <slot name="left"></slot>
                </div>
                <input type="text" :value="modelValue" @focus="handleFocus" @blur="handleBlur"
                    @keyup.enter="handleSearch" placeholder="请输入搜索内容" ref="inputRef" @input="handleInput($event)" />
                <div class="clear">
                    <slot name="clear" :onClear="handleClearInput" v-if="modelValue !== ''">
                        <div class="clear-input" @mousedown.prevent @click="handleClearInput">
                            <i class="iconfont icon-close"></i>
                        </div>
                    </slot>
                </div>
                <div class="input-right">
                    <slot name="right" :onSearch="handleSearch">
                        <div class="search-icon" @click="handleSearch" @mousedown.prevent>
                            <i class="iconfont icon-sousuo"></i>
                        </div>
                    </slot>
                </div>

            </div>

            <!-- 搜索历史/建议面板 -->
            <div class="search-panel" v-show="isShowPanel" @mousedown.prevent>
                <!-- 搜索历史 -->
                <div class="search-history" v-if="isShowHistory">
                    <div class="history-header">
                        <div class="history-label">
                            <span>搜索历史</span>
                        </div>
                        <div class="history-clear">
                            <span>清空</span>
                            <span><i class="iconfont icon-qingchu"></i></span>
                        </div>
                    </div>
                    <div class="history-main">
                        <div class="search-history-items" v-if="history.length > 0">
                            <div class="search-history-item" v-for="(item, index) in history" :key="index">
                                <span>{{ item }}</span>
                                <div class="delete-icon">
                                    <i class="iconfont icon-close"></i>
                                </div>
                            </div>
                        </div>
                        <div class="no-history" v-else>
                            <span><i class="iconfont icon-expression"></i></span>
                            <span>你目前没有搜索历史~</span>
                        </div>
                    </div>
                </div>

                <!-- 搜索建议 -->
                <div class="search-suggestion" v-else>
                    <ul>
                        <li v-for="(item, index) in suggestion" :key="index">{{ item }}</li>
                    </ul>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
const emit = defineEmits(['update:modelValue', 'clear', 'search'])
const inputRef = ref(null)
const isShowPanel = ref(false)
const isShowHistory = ref(true)

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    suggestion: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    }
})



// 处理聚焦
const handleFocus = () => {
    isShowPanel.value = true
    if (!props.modelValue.trim()) {
        isShowHistory.value = true
    } else {
        isShowHistory.value = false
    }
}



const handleClearInput = () => {
    inputRef.value.focus()
    emit('clear')
}

const handleInput = (e) => {
    emit('update:modelValue', e.target.value)
}


// 处理失去焦点
const handleBlur = () => {
    isShowPanel.value = false
}

// 处理搜索
const handleSearch = () => {
    if (!props.modelValue.trim()) {
        return
    }
    emit('search')
}

watch(() => props.modelValue, (newValue) => {
    if (!newValue.trim()) {
        isShowHistory.value = true
    } else {
        isShowHistory.value = false
    }
})

</script>
<style lang="scss" scoped>
.ao-search {
    width: 100%;
    position: relative;

    .search-container {
        width: 100%;
        position: relative;

        .input-wrapper {
            width: 100%;
            height: 40px;
            @include flex(c, c);

            @include c-t {
                border: 1px solid color(c-g3);
                background-color: color(c-g);
            }

            border-radius: 8px;
            transition: all 0.3s;
            box-sizing: border-box;
            overflow: hidden;

            &.focus {
                @include c-t {
                    border-color: color(c-s-lighter);
                }
            }

            input {
                flex: 1;
                height: 100%;
                padding: 0 12px;
                border: none;
                outline: none;
                font-size: 14px;

                @include c-t {
                    color: color(c-g9);
                }

                background: transparent;

                &::placeholder {
                    @include c-t {
                        color: color(c-g5);
                    }
                }
            }

            .clear-input {
                padding: 0px 11px;
                @include flex(c, c);

                @include c-t {
                    border-right: 1px solid color(c-g9, 0.5);
                }

                .iconfont {
                    padding-top: 2px;
                    font-size: 14px;
                    transition: color 0.2s ease-out;
                    cursor: pointer;

                    &:hover {
                        @include c-t {
                            color: color(c-p-lightest);
                        }
                    }
                }

            }

            .search-icon {
                width: 40px;
                height: 100%;
                @include flex(c, c);
                cursor: pointer;

                @include c-t {
                    color: color(c-g5);
                }

                transition: all 0.3s;

                &:hover {
                    @include c-t {
                        color: color(c-p);
                    }
                }
            }
        }

        .search-panel {
            @include p-a(t45, l0);
            @include wh(100p, n);
            @include flex(c, c);
            box-shadow: shadow(l);
            border-radius: 8px;
            z-index: 100;
            max-height: 500px;
            overflow-y: auto;

            @include c-t {
                background-color: color(c-g);
            }


            .search-history {
                @include wh;
                padding: 15px 20px;
                @include flex(n, n, c);


            }

            .history-header {
                @include wh;
                @include flex(c, s-b);

                .history-label {
                    font-size: 15px;
                    font-weight: 550;
                }

                .history-clear {
                    font-size: 12px;
                    gap: 3px;
                    cursor: pointer;
                    transition: all 0.2s ease-out;

                    &:hover {
                        @include c-t {
                            color: color(c-p-lighter);
                        }
                    }

                    @include c-t {
                        color: color(c-g9, 0.6);
                    }

                    span:last-child {
                        @include flex;
                        margin-top: 1px;
                    }

                    @include flex(c, c);

                    .iconfont {
                        font-size: 15px;

                    }
                }
            }


            .history-main {
                @include wh;
                padding: 20px 0;

                .search-history-items {
                    @include wh;
                    @include flex(n, n);
                    flex-wrap: wrap;
                    font-size: 12px;
                    gap: 15px;

                    .search-history-item {
                        padding: 5px 9px;
                        @include b-r($b-r);
                        position: relative;
                        cursor: pointer;

                        @include c-t {
                            background-color: color(c-s-lightest, 0.1);
                            color: color(c-g9, 0.7);
                        }

                        &:hover {
                            @include c-t {
                                background-color: color(c-s-lighter, 0.1);
                                color: color(c-p, 0.7);
                            }

                            .delete-icon {
                                display: flex;
                                opacity: 1;
                            }
                        }

                        .delete-icon {
                            position: absolute;
                            top: -6px; // 向上微调，可根据需要调整
                            right: -6px; // 向右微调，可根据需要调整
                            width: 15px;
                            height: 15px;
                            @include flex(c, c);
                            border-radius: 50%;
                            display: none;
                            opacity: 0;

                            @include c-t {
                                background-color: color(c-g7, 0.2);

                            }

                            &:hover {
                                .iconfont {
                                    @include c-t {
                                        color: color(c-p);
                                    }
                                }
                            }

                            cursor: pointer;
                            transition: all 0.2s ease;

                            .iconfont {
                                font-size: 12px;

                                @include c-t {
                                    color: color(c-g5);
                                }
                            }


                        }
                    }
                }

                .no-history {
                    @include wh;
                    @include flex(c, c, c);
                    gap: 7px;
                    font-size: 14px;

                    .iconfont {
                        font-size: 20px;
                    }

                    @include c-t {
                        color: color(c-p-lighter, 0.7);
                    }
                }
            }


            .search-suggestion {
                @include wh;
                font-size: 13px;
                padding: 10px;

                @include c-t {
                    color: color(c-g6);
                }

                ul {
                    @include wh;
                    @include flex(n, c, c);

                    li {
                        padding: 10px;
                        @include b-r($b-r);
                        transition: all 0.2s ease-out;


                        &:hover {
                            @include c-t {
                                color: color(c-s-lighter);
                                background-color: color(c-s-lightest);
                            }
                        }

                    }


                }

            }







        }
    }
}
</style>