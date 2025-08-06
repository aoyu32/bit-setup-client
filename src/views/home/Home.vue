<template>
    <div class="home">
        <div class="home-top">
            <div class="banner-container">
                <AoBanner />
            </div>
            <div class="control-panel-container">
                <ControlPanel />
            </div>
        </div>
        <div class="home-center">
            <div class="card-list-container">
                <CardList v-for="(item, index) in cardAppList" :key="index" :cardApp="item" />
            </div>
        </div>
        <div class="home-bottom">
            <div class="list-label">
                <span><i class="iconfont icon-shendusikao"></i></span>
                <h3>发现APP</h3>
            </div>
            <div class="app-list-container">
                <component :is="AppList" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoBanner from '@/components/common/AoBanner.vue';
import ControlPanel from '@/components/home/ControlPanel.vue';
import AppList from '@/components/home/AppList.vue';
import AppPage from '@/components/home/AppPage.vue';
import CardList from '@/components/home/CardList.vue';
import cardAppList from '../../utils/data';



</script>
<style lang="scss" scoped>
@use '@/assets/styles/home/home.scss' as *;
</style>