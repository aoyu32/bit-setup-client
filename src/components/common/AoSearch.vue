<template>
    <div class="ao-search">
        <div class="search-container" ref="searchContainer">
            <div class="input-wrapper" :class="{ focus: isShowPanel }">
                <div class="input-left">
                    <slot name="left"></slot>
                </div>
                <input type="text" :value="modelValue" @focus="handleFocus" @blur="handleBlur"
                    @keyup.enter="handleSearch" @keydown="handleKeydown" placeholder="请输入搜索内容" ref="inputRef"
                    @input="handleInput($event)" />
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
                        <div class="history-clear" @click="deleteHistoryItem('')">
                            <span>清空</span>
                            <span><i class="iconfont icon-qingchu"></i></span>
                        </div>
                    </div>
                    <div class="history-main">
                        <div class="search-history-items" v-if="history.length > 0">
                            <div class="search-history-item" v-for="(item, index) in history" :key="index"
                                @click="selectSuggestion(item.keyword)">
                                <span>{{ item.keyword }}</span>
                                <div class="delete-icon" @click.stop="deleteHistoryItem(item.id)">
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
                <div class="search-suggestion" v-if="!isShowHistory && suggestion.length !== 0">
                    <ul>
                        <li v-for="(item, index) in suggestion" :key="index"
                            :class="{ 'selected': index === selectedIndex }" @click="selectSuggestion(item)"
                            @mouseover="selectedIndex = index">
                            <div v-html="highlightKeyword(item)"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed, nextTick } from 'vue'

const emit = defineEmits(['update:modelValue', 'clear', 'search', 'focus', 'delete-history'])
const inputRef = ref(null)
const isShowPanel = ref(false)
const isShowHistory = ref(true)
const selectedIndex = ref(-1)

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
        default: () => []
    }
})

// 高亮关键字
const highlightKeyword = (item) => {
    if (!props.modelValue.trim()) return item;
    const keyword = props.modelValue.trim();
    const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return item.replace(regex, '<span class="lk">$1</span>');
}

// 处理聚焦
const handleFocus = () => {
    isShowPanel.value = true
    if (!props.modelValue.trim()) {
        isShowHistory.value = true
    } else {
        isShowHistory.value = false
    }
    selectedIndex.value = -1
    emit('focus')
}

// 处理键盘事件
const handleKeydown = (e) => {
    if (!isShowPanel.value || isShowHistory.value || !props.suggestion.length) return

    if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (selectedIndex.value >= props.suggestion.length - 1) {
            selectedIndex.value = 0 // 最后一个循环到第一个
        } else {
            selectedIndex.value += 1
        }
        updateInputDisplay()
    } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (selectedIndex.value <= 0) {
            selectedIndex.value = props.suggestion.length - 1 // 第一个循环到最后一个
        } else {
            selectedIndex.value -= 1
        }
        updateInputDisplay()
    } else if (e.key === 'Enter') {
        if (selectedIndex.value >= 0) {
            e.preventDefault()
            const selectedItem = props.suggestion[selectedIndex.value]
            // 关键修改：先更新 modelValue，再执行搜索
            emit('update:modelValue', selectedItem)
            // 使用 nextTick 确保 modelValue 更新后再执行搜索
            nextTick(() => {
                selectSuggestion(selectedItem)
                handleBlur()
            })
        }
    }
}

// 更新输入框显示值（不触发双向绑定）
const updateInputDisplay = () => {
    if (selectedIndex.value >= 0 && selectedIndex.value < props.suggestion.length) {
        inputRef.value.value = props.suggestion[selectedIndex.value]
    } else {
        inputRef.value.value = props.modelValue
    }
}

// 选择建议
const selectSuggestion = (item) => {
    emit('update:modelValue', item)
    inputRef.value.value = item
    inputRef.value.focus()
    handleSearch()
    handleBlur()
}

// 删除历史项
const deleteHistoryItem = (sid) => {
    if (props.history.length === 0) {
        return
    }
    emit('delete-history', sid)
}

const handleClearInput = () => {
    inputRef.value.focus()
    emit('clear')
    selectedIndex.value = -1
}

const handleInput = (e) => {
    emit('update:modelValue', e.target.value)
    selectedIndex.value = -1
}

// 处理失去焦点
const handleBlur = () => {
    setTimeout(() => {
        isShowPanel.value = false
        selectedIndex.value = -1
        inputRef.value.value = props.modelValue
    }, 200)
}

// 处理搜索
const handleSearch = () => {
    if (!props.modelValue.trim()) {
        return
    }
    emit('search')
    handleBlur()
}

watch(() => props.modelValue, (newValue) => {
    if (!newValue.trim()) {
        isShowHistory.value = true
    } else {
        isShowHistory.value = false
    }
    selectedIndex.value = -1
    inputRef.value.value = newValue
    handleFocus()
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
                            top: -6px;
                            right: -6px;
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
                        cursor: pointer;

                        &.selected {
                            @include c-t {
                                background-color: color(c-s-lightest);
                                color: color(c-g6);
                            }
                        }

                        &:hover {
                            @include c-t {
                                color: color(c-s-lighter);
                                background-color: color(c-s-lightest);
                            }
                        }

                    }

                    :deep(.lk) {
                        @include c-t {
                            color: color(error, 0.7);
                        }

                    }
                }
            }
        }
    }
}
</style>