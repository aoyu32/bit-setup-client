<template>
    <div class="home">
        <div class="home-top">
            <div class="banner-container">
                <HomeBanner />
            </div>
            <div class="control-panel">

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


</script>
<style lang="scss" scoped>
.home {
    @include wh-100;

    .home-top {
        width: 100%;
        height: 70%;
        padding: 10px 0;

        .banner-container {
            width: 860px;
            height: 430px;
            z-index: 0;
        }
    }
}
</style>