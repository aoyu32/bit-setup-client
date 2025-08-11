<template>
    <div class="ao-selector">
        <div class="selector-wrapper">
            <div class="select-header" @click="handleDropDown">
                <div class="select-left">
                    <slot name="left-icon"></slot>
                    <span class="select-value">{{ displayValue }}</span>
                </div>
                <div class="select-right">
                    <slot name="right-icon">
                        <span class="right-icon"><i class="iconfont icon-xiangxia-1"></i></span>
                    </slot>
                </div>
            </div>
            <div class="select-options" v-if="dropDown && options.length > 0">
                <ul>
                    <li v-for="(item, index) in options" :key="index" @click="handleSelect(item)">
                        {{ getFirstPropertyValue(item) }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Number, Boolean, Array, Object],
        required: true
    },
    options: {
        type: Array,
        default: () => [],
        validator: (value) => {
            // 验证每个对象是否正好有两个属性
            return value.every(item =>
                item && typeof item === 'object' && Object.keys(item).length === 2
            );
        }
    },
    placeholder: {
        type: String,
        default: '请选择'
    },
    maxHeight: {
        type: [String, Number],
        default: 200
    }
});

const emit = defineEmits(['update:modelValue']);

const dropDown = ref(false);

// 获取对象的第一个属性值（用于显示）
const getFirstPropertyValue = (obj) => {
    if (!obj) return '';
    const keys = Object.keys(obj);
    return keys.length > 0 ? obj[keys[0]] : '';
};

// 获取对象的第二个属性值（用于绑定值）
const getSecondPropertyValue = (obj) => {
    if (!obj) return '';
    const keys = Object.keys(obj);
    return keys.length > 1 ? obj[keys[1]] : obj[keys[0]];
};

// 显示当前选中的值
const displayValue = computed(() => {
    if (!props.modelValue) return props.placeholder;

    // 如果是对象，尝试获取第一个属性值
    if (typeof props.modelValue === 'object') {
        return getFirstPropertyValue(props.modelValue);
    }

    // 如果是基本类型，尝试从options中匹配
    const selectedItem = props.options.find(item =>
        getSecondPropertyValue(item) === props.modelValue
    );
    return selectedItem ? getFirstPropertyValue(selectedItem) : props.placeholder;
});

// // 计算最大高度
// const computedMaxHeight = computed(() => {
//     const height = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight;
//     return height;
// });

const handleDropDown = () => {
    dropDown.value = !dropDown.value;
};

const handleSelect = (item) => {
    dropDown.value = false;
    emit('update:modelValue', getSecondPropertyValue(item));
};
</script>

<style lang="scss" scoped>
.ao-selector {
    width: 100%;
    height: 100%;
    position: relative;
    font-family: inherit;

    .selector-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .select-header {
        width: 100%;
        height: 100%;
        padding: 5px 12px;
        background-color: #fff;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: border-color 0.2s ease;

        &:hover {
            border-color: #c0c4cc;
        }

        .select-left {
            display: flex;
            gap: 10px;

            .left-icon {
                display: flex;
                align-items: center;
                justify-content: center;

                .iconfont {
                    font-size: 19px;
                    color: #909399;
                }
            }

            .select-value {
                flex: 1;
                display: flex;
                align-items: center;
                color: #606266;
                font-size: 13px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .select-right {
            display: flex;
            justify-content: center;
            align-items: center;

            .arrow-icon {
                margin-left: 8px;
                transition: transform 0.2s ease;

                .iconfont {
                    font-size: 12px;
                    color: #c0c4cc;
                }
            }
        }
    }

    .select-options {
        position: absolute;
        top: calc(100% + 5px);
        left: 0;
        right: 0;
        z-index: 1000;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #e4e7ed;
        // max-height: v-bind(computedMaxHeight);
        max-height: 300px;
        overflow-y: auto;


        ul {
            width: 100%;
            height: auto;
            padding: 6px 0;
            margin: 0;
            list-style: none;
            display: flex;
            align-items: stretch;
            justify-content: flex-start;
            flex-direction: column;

            li {
                padding: 8px 16px;
                font-size: 14px;
                color: #606266;
                cursor: pointer;
                transition: background-color 0.2s ease;
                line-height: 1.5;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                &:hover {
                    background-color: #f5f7fa;
                    color: #409eff;
                }

                &:active {
                    background-color: #e6f7ff;
                }
            }
        }
    }
}
</style>