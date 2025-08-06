<template>
    <div class="detail-card">
        <div class="card-top">
            <div class="top-left">
                <div class="app-icon">
                    <img src="https://pc3.gtimg.com/softmgr/logo/48/36273_48_1730881145.png" alt="">
                </div>
                <div class="app-rating">
                    <span>4.6</span>
                    <span><i class="iconfont icon-shoucang"></i></span>
                </div>
            </div>
            <div class="top-right">
                <div class="top-right-header">
                    <div class="app-name">
                        <span>谷歌浏览器</span>
                    </div>
                    <div class="app-official">
                        <a href="">
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
                                    <span>系统工具</span>
                                    <span>浏览器</span>
                                </div>
                            </div>
                            <div class="app-version info-item">
                                <div class="label">
                                    <span>版本</span>
                                </div>
                                <div class="item-content">
                                    <span>V1.0.0</span>
                                </div>
                            </div>
                            <div class="app-size info-item">
                                <div class="label">
                                    <span>大小</span>
                                </div>
                                <div class="item-content">
                                    <span>100MB</span>
                                </div>
                            </div>
                        </div>
                        <div class="info-group">
                            <div class="app-platform info-item">
                                <div class="label">
                                    <span>支持平台</span>
                                </div>
                                <div class="item-content">
                                    <span>window</span>
                                    <span>mac</span>
                                    <span>linux</span>
                                </div>
                            </div>
                            <div class="app-paywall info-item">
                                <div class="label">
                                    <span>付费制度</span>
                                </div>
                                <div class="item-content">
                                    <span>付费</span>
                                </div>
                            </div>
                            <div class="app-developer info-item">
                                <div class="label">
                                    <span>开发商</span>
                                </div>
                                <div class="item-content">
                                    <span>腾讯</span>
                                </div>
                            </div>
                        </div>
                        <div class="info-group">
                            <div class="app-tag info-item">
                                <div class="label">
                                    <span>标签</span>
                                </div>
                                <div class="item-content">
                                    <span>轻量</span>
                                    <span>使用简单</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="app-download">
                        <div class="direct-link">
                            <a href="">
                                <div class="text">
                                    直链下载
                                </div>
                                <div class="down-fee">
                                    <span>10</span>
                                    <img src="../../assets/imgs/coin.svg" alt="">
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
                        <span>2023-12-02</span>
                    </div>
                    <div class="download stats-item">
                        <span>下载</span>
                        <span>1000</span>
                    </div>
                    <div class="comment stats-item">
                        <span>评论</span>
                        <span>1200</span>
                    </div>
                </div>
            </div>
            <div class="bottom-right">
                <div class="app-actions">
                    <div class="like">
                        <span>评个分</span>
                        <span>⭐⭐⭐⭐⭐</span>
                        <span>5.0</span>
                    </div>
                    <div class="save">
                        <span>收藏一下</span>
                        <span>23</span>
                        <span><i class="iconfont icon-shoucang"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoSelector from '../common/AoSelector.vue';
const cloudDiskOptions = ref([
    {
        label: '百度网盘',
        value: 'baidu'
    },
    {
        label: '夸克',
        value: 'quark'
    }
])

</script>
<style lang="scss" scoped>
@use '@/assets/styles/detail/_detail-card.scss' as *;
</style>