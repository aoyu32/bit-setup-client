<template>
    <div class="post-form">
        <div class="form-header">
            <div class="user-info">
                <div class="avatar">
                    <img src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=TechExplorer">
                </div>
                <div class="info">
                    <div class="name">
                        <span>test</span>
                    </div>
                    <div class="level">
                        <span>无敌新手</span>
                        <span>Lv0</span>
                        <span v-if="true">VIP</span>
                    </div>
                </div>
            </div>
            <div class="tag">
                <AoSelctor :options="['话题', '求助', '教程']" />
            </div>
        </div>
        <div class="form-main">
            <div class="post-title">
                <input type="text" placeholder="请输入标题">
            </div>
            <div class="post-content">
                <textarea name="" id="" placeholder="请输入帖子简述，不输默认截取文章内容"></textarea>
            </div>
            <div class="imgs-upload">
                <div class="img-item">
                    <input type="file">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import AoSelctor from '@/components/common/AoSelector.vue';
</script>
<style scoped lang="scss">
@use '@/assets/styles/community/post/_post-form.scss' as *;
</style>