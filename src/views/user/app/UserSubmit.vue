<template>
    <div class="user-upload">
        <AoTabs :tabs="tabs">

        </AoTabs>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoTabs from '../../../components/common/AoTabs.vue';

const tabs = ref([
    {
        key: 'app-share',
        label: '应用上传'
    },
    {
        key: 'app-dev',
        label: '个人开发'
    },
    {
        key: 'suite',
        label: '套件分享'
    }
])

</script>
<style scoped lang="scss"></style>