<template>
    <div class="ao-selector">
        <div class="selector-wrapper">
            <div class="select-header" @click="handleDropDown">
                <div class="select-left">
                    <slot name="left-icon"></slot>
                    <span class="select-value">{{ selectOption }}</span>
                </div>
                <div class="select-right">
                    <slot name="right-icon">
                        <span class="right-icon"><i class="iconfont icon-xiangxia-1"></i></span>
                    </slot>
                </div>
            </div>
            <div class="select-options" v-if="dropDwon && options.length > 0">
                <ul>
                    <li v-for="(item, index) in options" :key="index" @click="handleSelect(item)">{{ item.label }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
    modelValue: {
        type: [String, Number, Boolean, Array, Object],
        required: true
    },
    options: {
        type: Array,
        default: []
    }
})

const emit = defineEmits(['update:modelValue'])
const selectOption = ref(props.options.length === 0 ? '无选项' : props.options[0].label)
const dropDwon = ref(false)
const handleDropDown = () => {
    dropDwon.value = !dropDwon.value
}
const handleSelect = (item) => {
    selectOption.value = item.label
    dropDwon.value = false
    emit('update:modelValue', item.value)
}

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
        width: 100%;
        height: auto;
        z-index: 1000;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        background-color: #fff;

        ul {
            width: 100%;
            height: auto;
            padding: 10px;
            list-style: none;
            display: flex;
            align-self: center;
            justify-content: center;
            flex-direction: column;

            li {
                padding: 10px 16px;
                border-radius: 4px;
                font-size: 14px;
                color: #606266;
                cursor: pointer;
                transition: background-color 0.2s ease;

                &:hover {
                    background-color: #f5f7fa;
                    color: #409eff;
                }
            }
        }
    }


}
</style>