<template>
    <div class="user-download">
        <AoTabs :tabs="tabs" v-model="activeTab">
            <template #content>
                <div class="app-history dl-history" v-if="activeTab === 'app'">
                    <div class="app-history-list">
                        <div class="app-history-item" v-for="(app, index) in appHistoryData">
                            <div class="app-item-left">
                                <div class="app-icon">
                                    <img :src="app.icon" alt="">
                                </div>
                            </div>
                            <div class="app-item-center">
                                <div class="app-name">
                                    {{ app.name }}
                                </div>
                                <div class="app-version">
                                    {{ app.version }}
                                </div>
                                <div class="app-category">
                                    {{ app.category }}
                                </div>
                            </div>
                            <div class="app-item-right">
                                <div class="app-size">
                                    {{ app.size }}
                                </div>
                                <div class="app-fee">
                                    {{ app.fee }}A币
                                </div>
                                <div class="app-date">
                                    {{ app.date }}
                                </div>
                            </div>
                            <div class="delete-item" v-if="!isShowEditBtn">
                                <button>
                                    <i class="iconfont icon-close"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="suite-history dl-history" v-if="activeTab === 'suite'">
                    <div class="suite-history-list">
                        <div class="suite-history-item" v-for="(suiteItem, index) in suiteHistoryData" :key="index">
                            <div class="suite-item-left">
                                <div class="suite-avatar">
                                    <img :src="suiteItem.avatar" alt="">
                                </div>
                            </div>
                            <div class="suite-item-right">
                                <div class="item-info">
                                    <div class="info-left">
                                        <div class="suite-name">
                                            {{ suiteItem.name }}
                                        </div>
                                        <div class="suite-issuer">
                                            {{ suiteItem.issuer }}
                                        </div>
                                    </div>
                                    <div class="info-right">
                                        <div class="suite-size">
                                            {{ suiteItem.size }}
                                        </div>
                                        <div class="suite-fee">
                                            {{ suiteItem.fee }}A币
                                        </div>
                                        <div class="suite-date">
                                            {{ suiteItem.date }}
                                        </div>
                                    </div>
                                </div>
                                <div class="item-apps">
                                    <div class="app-item" v-for="(appItem, index) in suiteItem.apps" :key="index">
                                        <div class="app-icon">
                                            <img :src="appItem.icon" alt="">
                                        </div>
                                        <div class="app-category">
                                            {{ appItem.category }}
                                        </div>
                                        <div class="app-name">
                                            {{ appItem.name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="delete-item" v-if="!isShowEditBtn">
                                <button>
                                    <i class="iconfont icon-close"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #action>
                <div class="actions">
                    <button @click="isShowEditBtn = !isShowEditBtn" @click.prevent="handleEdit">
                        <span v-if="isShowEditBtn"><i class="iconfont icon-edit"></i></span>
                        <span v-else><i class="iconfont icon-cuowu"></i>取消</span>
                    </button>
                    <button v-if="!isShowEditBtn" class="clear">
                        <span><i class="iconfont icon-qingchu"></i></span>
                        <span>全部清除</span>
                    </button>
                </div>
            </template>
        </AoTabs>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import AoTabs from '../../../components/common/AoTabs.vue';
import { appHistoryData, suiteHistoryData } from '../../../utils/dl-history';
const activeTab = ref('')
const isShowEditBtn = ref(true)

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
const handleEdit = () => {
    console.log("hhh");

}



</script>
<style scoped lang="scss">
@use '@/assets/styles/user/_user-download.scss' as *;
</style>