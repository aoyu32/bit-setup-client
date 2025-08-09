<template>
    <div class="user-fans">
        <AoTabs :tabs="tabs">
            <template #content>
                <div class="user-fans-list">
                    <div class="user-fans-item" v-for="(fansItem,index) in fansData">
                        <div class="fans-item-left">
                            <div class="fans-avatar">
                                <img :src="fansItem.avatar" alt="">
                            </div>
                        </div>
                        <div class="fans-item-center">
                            <div class="fans-info">
                                <div class="fans-name-level">
                                    <div class="fans-name">
                                        {{ fansItem.name }}
                                    </div>
                                    <div class="fans-level">
                                        <span>{{ fansItem.level }}</span>
                                        <span>Lv{{ fansItem.levelNum }}</span>
                                    </div>
                                    <div class="fans-vip">
                                        <img src="../../../assets/imgs/vip.svg" alt="">
                                    </div>
                                </div>
                                <div class="fans-bio">
                                    <p>{{ fansItem.bio }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="fans-item-right">
                            <div class="fans-follow">
                                <button>
                                    <span v-if="!fansItem.isFollowed"><i class="iconfont icon-plus"></i></span>
                                    <span>{{ fansItem.isFollowed ? '已关注' : '互关' }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </AoTabs>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AoTabs from '../../../components/common/AoTabs.vue';
import { fansData } from '../../../utils/fans-follower-data';
const tabs = ref([
    {
        key: 'fans',
        label: '我的粉丝'
    }
])


</script>
<style scoped lang="scss">
@use '@/assets/styles/user/_user-fans.scss' as *;
</style>