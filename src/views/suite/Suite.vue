<template>
    <div class="suite">
        <div class="suite-left">
            <div class="custom-suite-container" v-if="showCustom">
                <CustomSuite @close="showCustom = false" />
            </div>
            <div class="suite-list-container">
                <SuiteCard :contentPosition="index % 2 !== 0 ? true : false" :suiteData="item"
                    v-for="(item, index) in suiteData" :key="index" />
            </div>
        </div>
        <div class="suite-right">
            <div class="my-suite-container">
                <SuiteSidebar :suiteList="suiteData" @showCustom="showCustom = true" />
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref } from 'vue'
import SuiteCard from '@/components/suite/SuiteCard.vue';
import suiteData from '../../utils/suite-data';
import SuiteSidebar from '@/components/suite/SuiteSidebar.vue';
import CustomSuite from '@/components/suite/CustomSuite.vue';

const showCustom = ref(true)

</script>
<style lang="scss" scoped>
.suite {
    @include wh;
    padding: 20px 0;
    @include flex;
    gap: 20px;
    position: relative;

    .suite-left {

        // @include wh(90p, 100p);
        // overflow-y: auto; // 允许左侧内容滚动
        flex: 4;


        .suite-list-container {
            @include flex(l, n, c);
            gap: 20px;
            margin-top: 20px;
        }
    }

    .suite-right {
        // width: 100%; 
        flex: 1;
        position: sticky;
        top: $header-height;
        height: 100vh;

        .my-suite-container {
            @include wh(100p, 100vh);

            @include c-t {
                background-color: color(c-g);
            }

            overflow-y: auto; // 如果内容很多，允许右侧内部滚动
        }
    }
}
</style>