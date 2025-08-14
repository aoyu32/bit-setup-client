<template>
    <div class="sign-stats">
        <div class="sign-btn">
            <button>今日签到</button>
        </div>
        <div class="stats">
            <div class="level">
                <div class="level-data">
                    <span>无敌新手</span>
                    <span>Lv0</span>
                    <span>VIP</span>
                </div>
                <div class="level-progress">
                    <div class="progress-container">
                        <AoProgress />
                    </div>
                    <div class="exp">
                        <div class="current-exp">
                            <span>当前经验值：34</span>
                        </div>
                        <div class="short-exp">
                            <span>距离下一级：66</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="stats-data">
                <div class="stats-item" v-for="item, index in StatsItems" :key="index">
                    <div class="stats-label">
                        {{ item.label }}
                    </div>
                    <div class="stats-value">
                        {{ item.value }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoProgress from '@/components/common/AoProgress.vue';
const StatsItems = ref([
    {
        label: '今日获取经验值',
        value: 10
    },
    {
        label: '今日签到排名',
        value: 2
    },
    {
        label: '今日签到获取A币',
        value: 3
    },
    {
        label: '连续签到天数',
        value: 2
    },
    {
        label: '累计签到天数',
        value: 4
    },
    {
        label: '累计获得A币',
        value: 134
    }

])
</script>
<style lang="scss" scoped>
@use '@/assets/styles/signin/_sign-stats.scss' as *;
</style>