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

        </div>
        <div class="home-bottom">

        </div>
    </div>
</template>
<script setup>
import HomeBanner from '@/components/home/HomeBanner.vue';
import ControlPanel from '@/components/home/ControlPanel.vue';


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
            // background-color: color.scale($color-dark, $lightness: 95%);
            border-radius: $border-radius;
            // box-shadow: $shadow-md;
        }
    }
}
</style>