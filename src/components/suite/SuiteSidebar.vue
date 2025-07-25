<template>
<div class="suite-sidebar">
    <div class="suite-nav">
        <div class="suite-nav-header header">
            <h3>套件导航</h3>
            <span>{{ suiteCount }}</span>
        </div>
        <div class="suite-nav-content">
            <ul class="suite-list">
                <li v-for="(item, index) in suiteList" :key="index">{{ item.name }}</li>
            </ul>
        </div>
    </div>
    <div class="my-suite">
        <div class="my-suite-header header">
            <h3>我的套件</h3>
            <span>{{ mySuiteList.length }}</span>
        </div>
        <div class="my-suite-content">
            <div class="no-my-suite" v-if="mySuiteList.length === 0">
                <span>你还没有自己的套件</span>
            </div>
            <ul class="suite-list" v-else>
                <li v-for="(item,index) in mySuiteList" :key="index">{{ item.name }}</li>
            </ul>
        </div>
    </div>
    <div class="custom-suite">
        <button>自定义套件</button>
    </div>
</div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps(['suiteList'])
const suiteCount = ref(props.suiteList.length)
const mySuiteList = ref([
  { id: 1, name: '默认套件', isDefault: true },
  { id: 2, name: '前端开发套件', isDefault: false },
  { id: 3, name: '数据分析套件', isDefault: false },
  { id: 4, name: '自动化测试套件', isDefault: false },
  { id: 5, name: 'UI 设计套件', isDefault: false },
  { id: 6, name: '后端 API 套件', isDefault: false },
  { id: 7, name: '移动端开发套件', isDefault: false },
  { id: 8, name: 'DevOps 工具套件', isDefault: false },
  { id: 9, name: '机器学习套件', isDefault: false },
  { id: 10, name: '网络安全套件', isDefault: false },
]);
</script>
<style lang="scss" scoped>
@use '@/assets/styles/suite/_suite-sidebar.scss' as *;
</style>