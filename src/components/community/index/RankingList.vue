<template>
    <div class="ranking-list">
        <div class="ranking-header">
            <div class="header-left">
                <slot name="title"></slot>
            </div>
            <div class="header-right">
                <slot name="more">

                </slot>
            </div>
        </div>
        <div class="ranking-main">
            <template v-if="!rankingList || rankingList.length === 0">
                <div class="no-data">
                    <slot name="empty">暂无数据</slot>
                </div>
            </template>
            <a v-for="(item, index) in rankingList">
                <slot name="item" :item="item" :index="index">
                    <div class="no-data">
                        暂无数据
                    </div>
                </slot>
            </a>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['rankingList'])
</script>
<style lang="scss" scoped>
@use '@/assets/styles/community/index/_ranking-list.scss' as *;
</style>