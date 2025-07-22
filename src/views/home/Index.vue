<template>
    <div class="home">
        <div class="home-top">
            <div class="banner-container">
                <HomeBanner />
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
            <div class="list-lable">
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
import HomeBanner from '@/components/home/HomeBanner.vue';
import ControlPanel from '@/components/home/ControlPanel.vue';
import AppList from '@/components/home/AppList.vue';
import AppPage from '@/components/home/AppPage.vue';
import CardList from '@/components/home/CardList.vue';
import cardAppList from '../../utils/data';



</script>
<style lang="scss" scoped>
.home {
    @include wh-100;

    .home-top {
        width: 100%;
        height: $home-top-height;
        padding: 10px 0;
        display: flex;
        gap: 30px;

        .banner-container {
            width: $home-banner-width;

            height: 100%;
        }

        .control-panel-container {
            @include wh-100;
            flex: 1;
            border-radius: $border-radius;
        }


    }

    .home-center {
        width: 100%;

        .card-list-container {
            @include wh-100;
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .home-bottom {
        @include wh-100;
        height: 1000px;
        padding: 10px 0;

        .list-lable {
            width: 100%;
            @include flex-lc;
            padding: 10px 0;
            color: $theme-secondary;
            gap: 5px;
            span {
                @include flex-c;
                .iconfont {
                    font-size: 24px
                }
            }
        }

        .app-list-container{
            width: 100%;
        }

        
    }
}
</style>