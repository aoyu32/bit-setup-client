<template>
    <div class="user-post">
        <AoTabs :tabs="tabs" v-model="activeTab">
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
            <template #content>
                <div class="user-post-list">
                    <div class="user-post-item" v-for="(postItem, index) in PostFilteData" :key="index">
                        <div class="delete-post">
                            <button v-if="!isShowEditBtn">
                                <span><i class="iconfont icon-shanchu"></i></span>
                                <span>删除</span>
                            </button>
                        </div>
                        <component :is="getComponent(postItem.tag.name)" :postData="postItem">
                        </component>
                    </div>
                </div>
            </template>
        </AoTabs>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import AoTabs from '../../../components/common/AoTabs.vue';
import postData from '../../../utils/post-data';
import PostCard from '@/components/community/index/PostCard.vue';
import ArticleCard from '@/components/community/index/ArticleCard.vue';
const activeTab = ref('')
const isShowEditBtn = ref(true)
const tabs = ref([
    {
        key: 'topic',
        label: '话题'
    },
    {
        key: 'help',
        label: '求助'
    },
    {
        key: 'course',
        label: '教程'
    },
    {
        key: 'article',
        label: '文章'
    }
])

const getComponent = (tag) => {
    if (tag === '话题' || tag === '求助') {
        return PostCard
    }
    if (tag === '教程' || tag === '文章') {
        return ArticleCard
    }
}

const PostFilteData = computed(() => {
    const tagMap = new Map(tabs.value.map(tab => [tab.key, tab.label]))
    return postData.filter(item => item.tag.name === tagMap.get(activeTab.value))
})

</script>
<style scoped lang="scss">
@use '@/assets/styles/user/_user-post.scss' as *;
</style>