<template>
    <div class="user-download">
        <AoTabs :tabs="tabs" v-model="activeTab">
            <template #content>
                <div class="app-history" v-if="activeTab === 'app'">
                    应用下载历史列表
                </div>
                <div class="suite-history" v-if="activeTab === 'suite'">
                    套件下载历史列表
                </div>
            </template>
        </AoTabs>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import AoTabs from '../../../components/common/AoTabs.vue';
const activeTab = ref('app')

const tabs = ref([
    {
        key: 'app',
        label: '应用记录'
    },
    {
        key: 'suite',
        label: '套件记录'
    }
])
onMounted(() => {
    console.log(activeTab.value);
})


</script>
<style scoped lang="scss">
.user-download {
    @include wh;


}
</style>