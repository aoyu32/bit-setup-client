<template>
    <div class="article-content">
        <div class="article-header">
            <div class="title">
                <h1>25 届入职初创公司，早10晚10压力很大，该如何快速上手公司并调整心态？</h1>
            </div>
            <div class="info">
                <div class="tag info-item">
                    <span><i class="iconfont icon-a-icon_huati"></i></span>
                    <span>话题</span>
                </div>
                <div class="date info-item">
                    <span><i class="iconfont icon-end-date"></i></span>
                    <span>2023-05-15</span>
                </div>
                <div class="views info-item">
                    <span><i class="iconfont icon-yuedu"></i></span>
                    <span>阅读：1000</span>
                </div>
            </div>
        </div>
        <div class="article-main">
            <AoMarkdwon markdownFile="/docs/temp.md" />
        </div>
        <div class="article-footer">
            <div class="status">
                <div class="status-item like">
                    <i class="iconfont icon-dianzan"></i>
                    <span>100</span>
                </div>
                <div class="status-item comment">
                    <i class="iconfont icon-pinglun"></i>
                    <span>103</span>
                </div>
                <div class="status-item saves">
                    <i class="iconfont icon-shoucang"></i>
                    <span>2342</span>
                </div>
            </div>
            <div class="action">
                <div class="more">
                    <span><i class="iconfont icon-ellipsis-vertical"></i></span>
                </div>
                <div class="more-menu">
                    <div class="report">
                        <span><i class="iconfont icon-warning"></i></span>
                        <span>举报</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import AoMarkdwon from '../../common/AoMarkdwon.vue';
</script>
<style lang="scss" scoped>
@use '@/assets/styles/community/detail/_article-content.scss' as *;
</style>