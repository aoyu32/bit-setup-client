<template>
    <div class="suite">
        <div class="suite-left">
            <div class="custom-suite-container">

            </div>
            <div class="suite-list-container">
                <SuiteCard :contentPosition="index % 2 === 0 ? true : false" :suiteData="item"
                    v-for="(item, index) in suiteData" :key="index" />
            </div>
        </div>
        <div class="suite-right">
            <div class="my-suite-container">
                <SuiteSidebar :suiteList="suiteData"/>
            </div>
        </div>

    </div>
</template>
<script setup>
import SuiteCard from '@/components/suite/SuiteCard.vue';
import suiteData from '../../utils/suite-data';
import SuiteSidebar from '@/components/suite/SuiteSidebar.vue';
</script>
<style lang="scss" scoped>
.suite {
    @include wh;
    padding: 20px 0;
    @include flex;
    gap: 20px;

    .suite-left {
        // @include wh(90p, 100p);
        overflow-y: auto; // 允许左侧内容滚动
        flex: 4;

        .suite-list-container {
            @include flex(l, n, c);
            gap: 20px;
        }
    }

    .suite-right {
        // width: 100%; 
        flex: 1;
        position: sticky;
        top: $header-height;
        align-self: flex-start; // 防止被拉伸

        height: 100vh;
        .my-suite-container {
            @include wh;
            background-color: color(c-g);
            height: 100vh;
            overflow-y: auto; // 如果内容很多，允许右侧内部滚动
        }
    }
}
</style>