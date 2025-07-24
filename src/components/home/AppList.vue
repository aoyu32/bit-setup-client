<template>
    <div class="app-list">
        <AppCard v-for="(item, index) in appListData" :key="index" :app="item" />
    </div>
</template>
<script setup>
import AppCard from './AppCard.vue';
import appListData from '@/utils/app-data.js'

</script>
<style lang="scss" scoped>
.app-list {
    width: 100%;
    @include grid(auto-fill, minmax(200px, 1fr), 70px)
}

@media (max-width:768px) {
    .app-list {
        @include grid(auto-fill, minmax(210px, 1fr))
    }

}
</style>