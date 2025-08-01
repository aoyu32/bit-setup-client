<template>
    <div class="community-post">
        <div class="community-post-header">
            <div class="header-left">
                <span><i class="iconfont icon-xiangzuo-1"></i></span>
                <span>发帖中心</span>
            </div>
            <div class="header-right">
            </div>
        </div>
        <div class="community-post-main">
            <!-- <div class="post-form-wrapper">
                <div class="post-form-container">
                    <PostForm />
                </div>
                <div class="post-form-preview">
                    <PostCard />
                </div>
            </div> -->

            <div class="article-editor-container">
                <ArticleEditor />
            </div>
        </div>
    </div>
</template>
<script setup>
import PostForm from '@/components/community/post/PostForm.vue';
import ArticleEditor from '@/components/community/post/ArticleEditor.vue';
import PostCard from '@/components/community/index/PostCard.vue';


</script>
<style scoped lang="scss">
.community-post {
    @include wh(100p, 100p);
    @include flex(n, n, c);

    .community-post-header {
        margin-top: 20px;
        padding: 15px 20px;
        background-color: color(c-g);

        .header-left {
            @include flex(c, n);
            gap: 10px;
            font-size: 14px;

            span {
                @include flex(c, c);
            }

            .iconfont {
                font-size: 16px;
            }
        }
    }

    .community-post-main {
        @include wh;
        @include flex(n, n, c);
        // background-color: color(c-g);

        // .post-form-wrapper {
        //     @include wh(100p, n);
        //     @include flex;
        //     gap: 20px;
        //     margin-top: 20px;
        // }


        // .post-form-container {
        //     @include wh(50p, n);
        //     background-color: antiquewhite
        // }

        // .post-form-preview {
        //     @include wh(50p, n);
        //     background-color: aqua;
        // }

        .article-editor-container{
            @include wh;
            min-height: 1000px;
        }


    }

}
</style>