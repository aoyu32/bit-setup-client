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
    width: 100%;

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
            @include wh(100p);
            flex: 1;
            border-radius: $b-r;
        }
    }

    .home-center {
        width: 100%;

        .card-list-container {
            width: 100%;
            @include grid(3,1fr,20px)

        }
    }

    .home-bottom {
        width: 100%;
        padding: 10px 0;
        margin-bottom: 20px;

        .list-lable {
            width: 100%;
            @include flex(c,l);
            padding: 20px 0;
            color: color(c-s);
            gap: 5px;

            span {
                @include flex(c,c);

                .iconfont {
                    font-size: 24px
                }
            }
        }

        .app-list-container {
            width: 100%;
        }
    }
}
</style>