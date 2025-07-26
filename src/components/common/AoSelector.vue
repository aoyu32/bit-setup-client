<template>
    <div class="selector">
        <div class="selector-wrapper">
            <div class="select-header" @click="handleDropDown">
                <span class="select-value"><i class="iconfont icon-tiaosepan"></i>{{ selectedValue }}</span>
                <span class="arrow-icon"><i class="iconfont icon-xiangxia-1"></i></span>
            </div>
            <div class="select-options">
                <transition name="fade">
                    <ul v-if="dropDwon">
                        <li v-for="(item, index) in options" :key="index" @click="handleSelect(index, item)">{{ item }}
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
    options: {
        type: Array,
        default: []
    }
})
const selectedValue = ref(props.options.length === 0 ? '无选项': props.options[0] )

const dropDwon = ref(false)

const handleDropDown = () => {
    dropDwon.value = !dropDwon.value

}

const handleSelect = (index, item) => {
    selectedValue.value = item
    dropDwon.value = false
}


</script>
<style lang="scss" scoped>
.selector {
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

        .select-value {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 6px;
            color: #606266;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            .iconfont {
                font-size: 16px;
                color: #909399;
            }
        }

        .arrow-icon {
            margin-left: 8px;
            transition: transform 0.2s ease;

            .iconfont {
                font-size: 12px;
                color: #c0c4cc;
            }
        }
    }

    .select-options {
        position: absolute;
        top: calc(100% + 5px);
        left: 0;
        width: 100%;
        z-index: 1000;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        background-color: #fff;

        ul {
            margin: 0;
            padding: 6px 0;
            list-style: none;
            max-height: 200px;
            display: flex;
            align-self: center;
            justify-content: center;
            flex-direction: column;
            overflow-y: auto;

            li {
                padding: 8px 16px;
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

    /* 过渡动画 */
    .v-enter-active,
    .v-leave-active {
        transition: all 0.3s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
        transform: translateY(-10px);
    }
}
</style>