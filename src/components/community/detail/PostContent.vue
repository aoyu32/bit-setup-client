<template>
    <div class="post-content">
        <div class="post-content-header">
            <div class="header-left">
                <div class="avatar">
                    <img src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=TechExplorer" alt="">
                </div>
                <div class="post-info">
                    <div class="name">
                        <span>跳槽当开发</span>
                    </div>
                    <div class="level">
                        <span>无敌新手</span>
                        <span>Lv0</span>
                        <span>VIP</span>
                    </div>

                </div>

            </div>
            <div class="header-right">
                <button>关注</button>
            </div>
        </div>
        <div class="post-content-main">
            <div class="title">
                <p>手把手教你如何免费下载付费应用（合法途径）</p>
            </div>
            <div class="content">
                <AoMarkdwon :markdownData="postContent" />
            </div>
            <div class="imgs">
                <div class="img-item">
                    <img src="https://pic.code-nav.cn/post_picture/1802686804244934657/eyILiIQ8Knr7gnjU.webp">
                </div>
                <div class="img-item">
                    <img src="https://pic.code-nav.cn/post_picture/1802686804244934657/kLJd7imBR0TIZhuP.webp">
                </div>
                <div class="img-item">
                    <img src="https://pic.code-nav.cn/post_picture/1802686804244934657/eyILiIQ8Knr7gnjU.webp">
                </div>
                <div class="img-item">
                    <img src="https://pic.code-nav.cn/post_picture/1802686804244934657/eyILiIQ8Knr7gnjU.webp">
                </div>
            </div>
        </div>
        <div class="post-content-footer">
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
            <div class="info">
                <div class="tag info-item">
                    <span><i class="iconfont icon-a-icon_huati"></i></span>
                    <span>话题</span>
                </div>
                <div class="views info-item">
                    <span><i class="iconfont icon-yuedu"></i></span>
                    <span>阅读：1000</span>
                </div>
                <div class="date info-item">
                    <span><i class="iconfont icon-end-date"></i></span>
                    <span>2023-05-15</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import AoMarkdwon from '@/components/common/AoMarkdwon.vue';

const postContent = `## Day 30

✅ **今天做了：**
1. LeetCode 数组 和 洛谷
2. 动力节点 - redis

⏰ **明天计划：**
1. 完成 MyBatis - 即代码练习和整理笔记
2. hsp-ssm

📚 **今日感悟：** 今天没给我换成markdown语法的字符串`;
</script>
<style lang="scss" scoped>
@use '@/assets/styles/community/detail/_post-content.scss' as *;
</style>