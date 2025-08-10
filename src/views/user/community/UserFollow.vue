<template>
    <div class="user-follow">
        <AoTabs :tabs="tabs">
            <template #action>
                <div class="actions">
                    <button @click="isShowEditBtn = !isShowEditBtn" @click.prevent="handleEdit">
                        <span v-if="isShowEditBtn"><i class="iconfont icon-edit"></i>取消关注</span>
                        <span v-else><i class="iconfont icon-cuowu"></i>取消</span>
                    </button>
                </div>
            </template>
            <template #content>
                <div class="user-follow-list">
                    <div class="user-follow-item" v-for="(followItem, index) in followerData">
                        <div class="follow-item-left">
                            <div class="follow-avatar">
                                <img :src="followItem.avatar" alt="">
                            </div>
                        </div>
                        <div class="follow-item-center">
                            <div class="follow-info">
                                <div class="follow-name-level">
                                    <div class="follow-name">
                                        {{ followItem.name }}
                                    </div>
                                    <div class="follow-level">
                                        <span>{{ followItem.level }}</span>
                                        <span>Lv{{ followItem.levelNum }}</span>
                                    </div>
                                    <div class="follow-vip">
                                        <img src="../../../assets/imgs/vip.svg" alt="">
                                    </div>
                                </div>
                                <div class="follow-bio">
                                    <p>{{ followItem.bio }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="follow-item-right">
                            <div class="follow-stats">
                                <div class="follow-posts">
                                    <span><i class="iconfont icon-details"></i></span>
                                    <span class="stats-label">帖子</span>
                                    <span> {{ followItem.post }}</span>
                                </div>
                                <div class="follow-fans stats">
                                    <span><i class="iconfont icon-xihuan"></i></span>
                                    <span class="stats-label">粉丝</span>
                                    {{ followItem.fans }}
                                </div>
                            </div>
                            <div class="not-follow" v-if="!isShowEditBtn">
                                <button>
                                    <span><i class="iconfont icon-close"></i></span>
                                    <span>取消关注</span>
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
import { followerData } from '../../../utils/fans-follower-data';
const isShowEditBtn = ref(true)
const tabs = ref([
    {
        key: 'follow',
        label: '我的关注'
    }
])
</script>
<style scoped lang="scss">
@use '@/assets/styles/user/_user-follow.scss' as *;
</style>