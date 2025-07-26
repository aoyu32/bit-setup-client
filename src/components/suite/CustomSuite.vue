<template>
    <div class="custom-suite">
        <div class="custom-suite-header">
            <div class="suite-name">
                <span>自定义套件</span>
            </div>
            <div class="suite-icons">
                <button class="save">
                    <span><i class="iconfont icon-save"></i></span>
                </button>
                <button class="edit">
                    <span><i class="iconfont icon-edit"></i></span>
                </button>
                <button class="close" @click="handleClose">
                    <span><i class="iconfont icon-menu-unfold"></i></span>
                </button>
            </div>
        </div>
        <div class="custom-suite-content">
            <div class="suite-content-left">
                <div class="suite-info">
                    <div class="suite-info-top">
                        <div class="suite-author-avatar">
                            <img src="../../assets/logo.svg" alt="">
                        </div>
                        <div class="suite-author-name">
                            <span>myself</span>
                        </div>
                    </div>
                    <div class="suite-info-bottom">
                        <div class="base-info count"> 0个应用</div>
                        <div class="base-info coin"><span>0</span>A币</div>
                        <div class="base-info">0次下载</div>
                        <div class="base-info">0MB</div>
                    </div>
                </div>
                <div class="suite-button">
                    <button>下载套件</button>
                    <button>共享套件</button>
                </div>
            </div>
            <div class="suite-content-right">
                <div class="suite-apps">
                    <div class="suite-app-item" @click="showSelector = true">
                        <span><i class="iconfont icon-zengjia"></i></span>
                    </div>
                </div>
                <div class="app-selector" v-if="showSelector">
                    <div class="app-selector-header">
                        <h4>请挑选你的app</h4>
                        <button @click="showSelector = false"><i class="iconfont icon-close"></i></button>
                    </div>
                    <div class="selectors">
                        <div class="left-selector">
                            <AoSelector :options="['test1', 'dtest2', 'test3', 'test4']" />
                        </div>
                        <div class="right-selector">
                            <AoSelector :options="['option1', 'option2', 'option3', 'option4']" />
                        </div>
                    </div>
                    <div class="options">
                        <div class="suite-app-item" v-for="(item, index) in appListData" :key="index">
                            <img :src="item.img" alt="">
                            <span class="item-category">{{ item.category }}</span>
                            <span class="item-name">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
                <div class="suite-description">
                    <div class="description-input">
                        <textarea placeholder="请输入描述" ref="autoResizeTextarea" @input="adjustTextareaHeight"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import CategoryOption from '../category/CategoryOption.vue'
import AoSelector from '../common/AoSelector.vue'
import appListData from '../../utils/app-data'
const autoResizeTextarea = ref(null)
const closeCusteomSuite = ref(false)
const showSelector = ref(false)

const emit = defineEmits(['close'])

const adjustTextareaHeight = () => {
    const textarea = autoResizeTextarea.value
    textarea.style.height = 'auto' // 先重置高度
    textarea.style.height = `${textarea.scrollHeight}px` // 再设置为内容高度
}

onMounted(() => {
    adjustTextareaHeight() // 初始化时执行一次
})

const handleCloseSelector = () => {

}

const handleClose = () => {
    emit('close')
}

</script>
<style lang="scss" scoped>
@use '@/assets/styles/suite/_custom-suite.scss' as *;
</style>