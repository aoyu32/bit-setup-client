<template>
    <div class="user-recharge">
        <AoTabs :tabs="tabs">
            <template #content>
                
            </template>
            <template #action>

            </template>
        </AoTabs>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoTabs from '../../../components/common/AoTabs.vue';
const activeTab = ref('')

const tabs = ref([
    {
        key:'a-coin',
        label:'A币充值'
    },
    {
        key:'vip',
        label:'VIP充值'
    }
])

</script>
<style scoped lang="scss"></style>