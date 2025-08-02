<template>
    <div class="community-post">
        <div class="community-post-header">
            <div class="header-left">
                <span><i class="iconfont icon-xiangzuo-1"></i></span>
                <span>发帖中心</span>
            </div>
            <div class="header-right">
                <button>保存草稿</button>
                <button>发布</button>
            </div>
        </div>
        <div class="community-post-main">
            <div class="post-form-wrapper">
                <div class="post-form-container">
                    <PostForm />
                </div>
                <div class="post-card-container">
                    <PostCard :postData="postCardData" />
                </div>
            </div>
            <div class="article-lable">
                <div class="lable-left">
                    <span><i class="iconfont icon-dengji"></i></span>
                    <span>编辑文章</span>
                </div>
                <div class="lable-right">
                    <div class="upload-document">
                        <input type="file" ref="uploadDocumentRef" accept=".md" @change="handleFileChange">
                        <button @click="triggerUploadDocument">上传文档</button>
                    </div>
                </div>
            </div>
            <div class="article-editor-container">
                <ArticleEditor />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import PostForm from '@/components/community/post/PostForm.vue';
import ArticleEditor from '@/components/community/post/ArticleEditor.vue';
import PostCard from '@/components/community/index/PostCard.vue';

const uploadDocumentRef = ref(null)
const postCardData = ref({
    user: {
        name: '科技探索者',
        avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=TechExplorer',
        level: '高级玩家',
        levelNum: 5,
        isVip: true
    },
    tag: {
        name: '话题',
        icon: 'icon-huati'
    },
    title: '这里是帖子的标题',
    content: '这里是帖子的摘要，非必须填哦，不填默认摘取文章开头一些内容作为摘要',
    images: [

    ],
    stats: {
        likes: 0,
        comments: 0,
        views: 0,
        saves: 0
    },
    date: '2023-05-15 14:30'
},)

const triggerUploadDocument = () => {
    uploadDocumentRef.value.click()
}

const handleFileChange = (e) => {
    const file = e.target.files[0];
};

</script>
<style scoped lang="scss">
.community-post {
    @include wh(100p, 100p);
    @include flex(n, n, c);

    .community-post-header {
        margin-top: 20px;
        padding: 15px 20px;
        background-color: color(c-g);
        @include flex(c, s-b);

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

        .header-right {
            @include flex;
            gap: 15px;
            font-size: 14px;

            button {
                padding: 5px 10px;
                @include b-r(4);

                @include c-t {
                    background-color: color(c-p-lighter);
                    color: color(c-g0);
                }
            }
        }
    }

    .community-post-main {
        @include wh;
        @include flex(n, n, c);

        .post-form-wrapper {
            @include wh;
            gap: 20px;
            display: grid;
            margin: 20px 0;
            grid-template-columns: repeat(2, 1fr);


            .post-form-container {
                @include wh(100p, 100p);

                @include c-t {
                    background-color: color(c-g);
                }

                padding: 5px 0;
            }

            .post-card-container {
                @include wh(100p, 100p);
                @include flex(t, c);

                @include c-t {
                    background-color: color(c-g);
                }
            }
        }

        .article-lable {
            @include wh;
            @include flex(c, s-b);
            margin-bottom: 20px;

            .lable-left {
                @include flex(b, c);
                font-size: 19px;
                font-weight: 550;
                gap: 5px;

                span {
                    @include flex(c, c);
                }

                .iconfont {
                    font-size: 22px;
                }
            }

            .lable-right {
                .upload-document {
                    font-size: 14px;

                    input {
                        display: none;
                    }

                    button {
                        padding: 6px 10px;
                        @include b-r(4);

                        @include c-t {
                            background-color: color(c-p-lighter);
                            color: color(c-g);
                        }
                    }
                }
            }


        }

        .article-editor-container {
            @include wh;
            min-height: 1000px;
        }


    }

}
</style>