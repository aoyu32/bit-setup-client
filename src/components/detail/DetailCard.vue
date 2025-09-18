<template>
    <div class="detail-card">
        <div class="card-top">
            <div class="top-left">
                <div class="app-icon">
                    <img :src="data.iconUrl" alt="">
                </div>
                <div class="app-rating">
                    <span>{{ data.rating }}</span>
                    <span><i class="iconfont icon-shoucang"></i></span>
                </div>
            </div>
            <div class="top-right">
                <div class="top-right-header">
                    <div class="app-name">
                        <span>{{ data.appName }}</span>
                    </div>
                    <div class="app-official">
                        <a :href="data.officialWebsite">
                            <span>官方网站</span>
                            <span><i class="iconfont icon-export"></i></span>
                        </a>
                    </div>
                </div>
                <div class="top-right-main">
                    <div class="app-info-items">
                        <div class="info-group">
                            <div class="app-category info-item">
                                <div class="label">
                                    <span>类别</span>
                                </div>
                                <div class="item-content">
                                    <span>{{ data.parentCategory }}</span>
                                    <span>{{ data.childCategory }}</span>
                                </div>
                            </div>
                            <div class="app-version info-item">
                                <div class="label">
                                    <span>版本</span>
                                </div>
                                <div class="item-content">
                                    <span>{{ data.appVersion }}</span>
                                </div>
                            </div>
                            <div class="app-size info-item">
                                <div class="label">
                                    <span>大小</span>
                                </div>
                                <div class="item-content">
                                    <span>{{ appSize }}MB</span>
                                </div>
                            </div>
                        </div>
                        <div class="info-group">
                            <div class="app-platform info-item">
                                <div class="label">
                                    <span>支持平台</span>
                                </div>
                                <div class="item-content">
                                    <span v-for="platform in data.platform">{{ platform }}</span>
                                </div>
                            </div>
                            <div class="app-paywall info-item">
                                <div class="label">
                                    <span>付费制度</span>
                                </div>
                                <div class="item-content">
                                    <span>{{ getPaymentName(data.pricingModel) }}</span>
                                </div>
                            </div>
                            <div class="app-developer info-item">
                                <div class="label">
                                    <span>开发商</span>
                                </div>
                                <div class="item-content">
                                    <span>{{ data.developer }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="info-group">
                            <div class="app-tag info-item">
                                <div class="label">
                                    <span>标签</span>
                                </div>
                                <div class="item-content">
                                    <span v-for="tag in data.tags">{{ tag }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="app-download">
                        <div class="direct-link">
                            <a :href="data.downloadUrl">
                                <div class="text">
                                    直链下载
                                </div>
                                <div class="down-fee" v-if="data.points !== 0">
                                    <span>{{ data.points }}</span>
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
        </div>
        <div class="card-bottom">
            <div class="bottom-left">
                <div class="app-stats">
                    <div class="date stats-item">
                        <span>发布日期：</span>
                        <span>{{ releaseDate }}</span>
                    </div>
                    <div class="download stats-item">
                        <span>下载</span>
                        <span>{{ data.downloadCount }}</span>
                    </div>
                    <div class="comment stats-item">
                        <span>评论</span>
                        <span>{{ data.commentCount }}</span>
                    </div>
                </div>
            </div>
            <div class="bottom-right">
                <div class="app-actions">
                    <!-- <div class="like">
                        <span>评个分</span>
                        <div class="rate-container">
                            <AoRate />
                        </div>
                    </div> -->
                    <div class="save">
                        <span>收藏一下</span>
                        <span>{{ data.collectCount }}</span>
                        <span><i class="iconfont icon-shoucang"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import AoRate from '../common/AoRate.vue';
const props = defineProps({
    data: {
        type: Object,
        required: true
    },

})


const getPaymentName = (value) => {
    const paymentOptions = [
        { name: "不限", value: "" },
        { name: "完全免费", value: "free" },
        { name: "试用转付费", value: "trial" },
        { name: "买断制", value: "one_time" },
        { name: "订阅制", value: "subscription" },
        { name: "内购制", value: "in_app_purchase" },
        { name: "开源", value: "open_source" }
    ];
    return paymentOptions.find(option => option.value === value)?.name || '';
}

const appSize = computed(() => {
    return Math.floor(props.data.size / 1024 / 1024)
})

const releaseDate = computed(() => {
    const date = new Date(props.data.createTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
})
</script>
<style lang="scss" scoped>
@use '@/assets/styles/detail/_detail-card.scss' as *;
</style>