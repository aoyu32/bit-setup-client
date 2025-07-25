<template>
    <div class="suite-card">
        <div class="suite-card-header">
            <div class="suite-name">
                <span>{{ suiteData.name }}</span>
            </div>
            <div class="suite-edit">
                <button>
                    <span><i class="iconfont icon-edit"></i></span>
                </button>
            </div>
        </div>
        <div class="suite-card-content">
            <div class="suite-content-left" v-if="contentPosition">
                <div class="suite-info">
                    <div class="suite-info-top">
                        <div class="suite-author-avatar">
                            <img src="../../assets/logo.svg" alt="">
                        </div>
                        <div class="suite-author-name">
                            <span>{{ suiteData.author }}</span>
                        </div>
                    </div>
                    <div class="suite-info-bottom">
                        <div class="base-info count"> {{ suiteData.apps.length }}个应用</div>
                        <div class="base-info coin"><span>{{ suiteData.fee }}</span>A币</div>
                        <div class="base-info">{{ suiteData.download }}次下载</div>
                        <div class="base-info">{{ suiteData.size }}G</div>
                    </div>
                </div>
                <div class="suite-button">
                    <button>下载套件</button>
                    <button>保到我的套件</button>
                </div>
            </div>
            <div class="suite-content-right">
                <div class="suite-apps">
                    <div class="suite-app-item" v-for="(item,index) in suiteData.apps" :key="index">
                        <img :src="item.img" alt="">
                        <span class="item-category">{{ item.category }}</span>
                        <span class="item-name">{{ item.name }}</span>
                    </div>
                </div>
                <div class="suite-description">
                    {{ suiteData.description }}
                </div>
            </div>
            <div class="suite-content-left" v-if="!contentPosition">
                <div class="suite-info">
                    <div class="suite-info-top">
                        <div class="suite-author-avatar">
                            <img src="../../assets/logo.svg" alt="">
                        </div>
                        <div class="suite-author-name">
                            <span>{{ suiteData.author }}</span>
                        </div>
                    </div>
                    <div class="suite-info-bottom">
                        <div class="base-info count">{{suiteData.apps.length}}个应用</div>
                        <div class="base-info coin"><span>{{ suiteData.fee }}</span>A币</div>
                        <div class="base-info">{{suiteData.download}}次下载</div>
                        <div class="base-info">{{ suiteData.size }}G</div>
                    </div>
                </div>
                <div class="suite-button">
                    <button>下载套件</button>
                    <button>保到我的套件</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const porps = defineProps(['contentPosition', 'suiteData'])
</script>
<style lang="scss" scoped>
@use '@/assets/styles/suite/_suite-card.scss' as *;
</style>