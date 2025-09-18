<template>
    <div class="other-version">
        <div class="other-version-header">
            <div class="version-selector">
                <AoSelector :options="versionOptions" v-model="selectedVersionId" value-key="id" label-key="label"
                    placeholder="请选择版本" @change="handleVersionChange">
                    <template #left-icon>
                        <div class="app-img">
                            <img :src="app.icon" alt="">
                        </div>
                    </template>
                    <template #right-icon>
                        <div class="version-info">
                            <div class="version-size">
                                <span>大小：</span>
                                <span>{{ Math.floor(currentVersion?.size / 1024 / 1024) || '0' }} MB</span>
                            </div>
                            <div class="version-download">
                                <span>下载量：</span>
                                <span>{{ currentVersion?.downloadCount || '0' }}</span>
                            </div>
                        </div>
                        <div class="arrow-icon">
                            <span class="right-icon"><i class="iconfont icon-xiangxia-1"></i></span>
                        </div>
                    </template>
                </AoSelector>
            </div>
        </div>
        <div class="other-version-main">
            <div class="log">
                <div class="label">
                    <h4>版本更新日志：</h4>
                </div>
                <div class="log-content">
                    <AoMarkdwon :markdownData="currentVersion?.releaseNotes" />
                </div>
            </div>
        </div>
        <div class="other-version-footer">
            <div class="label">
                <h4>下载该版本：</h4>
            </div>
            <div class="links">
                <div class="direct-link">
                    <a :href="currentVersion?.downloadUrl">
                        <div class="text">
                            直链下载
                        </div>
                        <div class="down-fee" v-if="app.points !== 0">
                            <span>{{ app.points }}</span>
                            <img src="../../assets/imgs/coin.svg" alt="">
                        </div>
                        <div class="down-free down-fee" v-else>
                            <span>免费</span>
                            <span><i style="font-size: 12px;" class="iconfont icon-download"></i></span>
                        </div>
                    </a>
                </div>
                <div class="cloud-disk-link">
                    <!-- <div class="cloud-disk-selector">
                                <AoSelector :options="cloudDiskOptions" />
                            </div> -->
                    <div class="cloud-disk-url">
                        <a href="">网盘下载</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import AoSelector from '@/components/common/AoSelector.vue';
import AoMarkdwon from '@/components/common/AoMarkdwon.vue';

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    },
    app: {
        type: Object,
        default: () => {
            return {
                appName: '',
                icon: '',
                points: 0,
            }
        }
    }
})

// 选中的版本ID
const selectedVersionId = ref(null)

// 转换数据格式为AoSelector需要的格式
const versionOptions = computed(() => {
    console.log("其他版本数据:", props.data);

    return props.data.map(item => ({
        id: item.id,
        label: `${props.app.appName}（V${item.version}）`,
        // 保存完整的版本信息
        versionData: {
            id: item.id,
            version: item.version,
            downloadUrl: item.downloadUrl,
            releaseNotes: item.releaseNotes,
            size: item.size,
            downloadCount: item.downloadCount,
        }
    }))
})

// 当前选中的版本信息
const currentVersion = computed(() => {
    if (!selectedVersionId.value) return null

    const selectedOption = versionOptions.value.find(option => option.id === selectedVersionId.value)
    return selectedOption ? selectedOption.versionData : null
})

// 版本选择改变事件
const handleVersionChange = (versionId, selectedItem) => {
    console.log('选中版本:', versionId, selectedItem)
}

// 初始化选择第一个版本
watch(() => props.data, (newData) => {
    if (newData && newData.length > 0 && !selectedVersionId.value) {
        selectedVersionId.value = newData[0].id
    }
}, { immediate: true })
</script>

<style lang="scss" scoped>
@use '@/assets/styles/detail/_other-version.scss' as *;
</style>