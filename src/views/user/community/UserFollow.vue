<template>
    <div class="user-follow">
        <AoTabs :tabs="tabs">

        </AoTabs>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoTabs from '../../../components/common/AoTabs.vue';

const tabs = ref([
    {
        key: 'follow',
        label: '我的关注'
    }
])
</script>
<style scoped lang="scss"></style>