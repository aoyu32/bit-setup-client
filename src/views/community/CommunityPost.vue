<template>
    <div class="community-post">
        <div class="community-post-header">
            <router-link to="/community/index">
                <div class="header-left">
                    <span><i class="iconfont icon-xiangzuo-1"></i></span>
                    <span>发帖中心</span>
                </div>
            </router-link>
            <div class="header-right">
                <button @click="handleSavePost">保存草稿</button>
                <button @click="handlePublishPost">发布</button>
            </div>
        </div>
        <div class="community-post-main">
            <div class="post-form-wrapper">
                <div class="post-form-container">
                    <PostForm />
                </div>
                <div class="post-card-container">
                    <component :is="getComponentByTag(communityStore.postFormData.category)" :postData="cardData">
                    </component>
                </div>
            </div>
            <div class="article-label">
                <div class="label-left">
                    <span><i class="iconfont icon-dengji"></i></span>
                    <span>编辑文章</span>
                </div>
                <div class="label-right">
                    <div class="upload-document">
                        <input type="file" ref="uploadDocumentRef" accept=".md,.markdown" @change="handleFileChange">
                        <button @click="triggerUploadDocument">上传文档</button>
                    </div>
                </div>
            </div>
            <div class="article-editor-container">
                <ArticleEditor v-model="communityStore.postFormData.content" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import PostForm from '@/components/community/post/PostForm.vue';
import ArticleEditor from '@/components/community/post/ArticleEditor.vue';
import PostCard from '@/components/community/index/PostCard.vue';
import { useCommunityStore } from '../../stores/community';
import { useUserInfoStore } from '../../stores/user';
import ArticleCard from '../../components/community/index/ArticleCard.vue';
import message from '../../utils/message'; // 导入 message 工具

const communityStore = useCommunityStore()
const userStore = useUserInfoStore()
const options = ref([
    { id: 1, label: '话题', value: 'topic' },
    { id: 2, label: '求助', value: 'help' },
    { id: 3, label: '教程', value: 'course' },
    { id: 4, label: '文章', value: 'article' }
])

const componentMap = {
    'topic': PostCard,
    'help': PostCard,
    'article': ArticleCard,
    'course': ArticleCard
};

const getComponentByTag = (tagName) => {
    console.log(tagName);
    
    return componentMap[tagName] || PostCard;
};
const uploadDocumentRef = ref(null)

const currentTime = ref('')

// 获取当前时间的函数
function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

let timer = null

// 组件挂载时启动定时器
onMounted(() => {
    currentTime.value = getCurrentTime()
    timer = setInterval(() => {
        currentTime.value = getCurrentTime()
    }, 1000)
})

// 组件卸载时清理定时器
onUnmounted(() => {
    if (timer) {
        clearInterval(timer)
    }
})

// 输入内容校验函数
const validateFormData = (isPublish = false) => {
    const { title, category, summary, content } = communityStore.postFormData;

    // 基础必填字段校验
    if (!title || title.trim() === '') {
        message.warn('请输入帖子标题');
        return false;
    }

    if (title.trim().length < 2 || title.trim().length > 50) {
        message.warn('标题长度应在2-50个字符之间');
        return false;
    }

    if (!category) {
        message.warn('请选择帖子分类');
        return false;
    }

    // 发布时的额外校验
    if (isPublish) {
        if (!summary || summary.trim() === '') {
            message.warn('请输入帖子摘要');
            return false;
        }

        if (summary.trim().length < 10 || summary.trim().length > 200) {
            message.warn('摘要长度应在10-200个字符之间');
            return false;
        }

        if (!content || content.trim() === '') {
            message.warn('请输入帖子内容');
            return false;
        }

        if (content.trim().length < 10) {
            message.warn('内容长度至少需要10个字符');
            return false;
        }
    }

    // 草稿保存时的内容校验（相对宽松）
    if (content && content.trim().length > 5000) {
        message.warn('内容长度不能超过5000个字符');
        return false;
    }

    return true;
}

const handleSavePost = () => {
    // 草稿保存校验（相对宽松）
    if (!validateFormData(false)) {
        return;
    }

    communityStore.postFormData.isPublish = false
    communityStore.fetchSavePost(communityStore.postFormData)
}

const handlePublishPost = () => {
    // 发布校验（严格）
    if (!validateFormData(true)) {
        return;
    }

    communityStore.postFormData.isPublish = true
    communityStore.fetchSavePost(communityStore.postFormData)
}

const cardData = computed(() => {
    return {
        pid:'',
        user: {
            nickname: userStore.userData.nickname,
            avatar: userStore.userData.avatar,
            levelTitle: userStore.userData.levelTitle,
            level: userStore.userData.level,
            role: userStore.userData.role === 'vip'
        },
        category: options.value.find(option => option.value === communityStore.postFormData.category)?.label || '话题',
        title: communityStore.postFormData.title ? communityStore.postFormData.title : '这是帖子的标题',
        summary: communityStore.postFormData.summary ? communityStore.postFormData.summary : '这里是帖子的摘要',
        images: communityStore.postFormData.images,
        likeCount: 0,
        commentCount: 0,
        viewCount: 0,
        saveCount: 0,
        publishTime: currentTime.value
    }
})

const triggerUploadDocument = () => {
    uploadDocumentRef.value.click()
}

const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 检查文件类型
    if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown')) {
        message.warn('请选择 Markdown 文件 (.md 或 .markdown)');
        return;
    }

    try {
        // 读取文件内容
        const content = await readFileAsText(file);
        console.log("文章内容：", content);

        // 将内容绑定到编辑器中
        communityStore.postFormData.content = content;

        // 自动提取标题
        autoExtractTitle(content);

        message.success('MD 文档读取成功，内容已加载到编辑器');
    } catch (error) {
        console.error('读取文件失败:', error);
        message.error('文件读取失败，请重试');
    } finally {
        // 清空 input，允许重复选择同一文件
        e.target.value = '';
    }
}

// 读取文件为文本
const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file, 'UTF-8');
    });
}

// 自动提取标题（只提取第一个一级标题）
const autoExtractTitle = (content) => {
    if (!content) return;

    // 提取第一个一级标题 (# 标题)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
        communityStore.postFormData.title = titleMatch[1].trim();
        message.success(`已自动提取标题: ${titleMatch[1].trim()}`);
    }
}
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

        .article-label {
            @include wh;
            @include flex(c, s-b);
            margin-bottom: 20px;

            .label-left {
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

            .label-right {
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

// 在原有的样式基础上添加以下媒体查询
@media (max-width: 1200px) {
    .community-post {
        .community-post-main {
            .post-form-wrapper {
                gap: 15px;
                margin: 15px 0;
            }
        }
    }
}

@media (max-width: 992px) {
    .community-post {
        .community-post-main {
            .post-form-wrapper {
                grid-template-columns: 1fr;
                gap: 15px;

                .post-card-container {
                    order: -1;
                    height: auto;
                    min-height: 200px;
                }

                .post-form-container {
                    height: auto;
                }
            }

            .article-editor-container {
                min-height: 800px;
            }
        }
    }
}

@media (max-width: 768px) {
    .community-post {
        .community-post-header {
            padding: 12px 15px;
            margin-top: 15px;

            .header-right {
                gap: 10px;

                button {
                    padding: 4px 8px;
                    font-size: 13px;
                }
            }

            .header-left {
                font-size: 13px;
                gap: 8px;

                .iconfont {
                    font-size: 14px;
                }
            }
        }

        .community-post-main {
            .article-label {
                margin-bottom: 15px;

                .label-left {
                    font-size: 17px;

                    .iconfont {
                        font-size: 20px;
                    }
                }

                .label-right {
                    .upload-document {
                        font-size: 13px;

                        button {
                            padding: 5px 8px;
                        }
                    }
                }
            }

            .post-form-wrapper {
                margin: 15px 0;
                gap: 12px;
            }

            .article-editor-container {
                min-height: 600px;
            }
        }
    }
}

@media (max-width: 576px) {
    .community-post {
        .community-post-header {
            padding: 10px 12px;
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;

            .header-left,
            .header-right {
                width: 100%;
                justify-content: space-between;
            }
        }

        .community-post-main {
            .article-label {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;

                .label-left {
                    font-size: 16px;

                    .iconfont {
                        font-size: 18px;
                    }
                }
            }

            .post-form-wrapper {
                margin: 10px 0;
                gap: 10px;
            }

            .article-editor-container {
                min-height: 500px;
            }
        }
    }
}

@media (max-width: 480px) {
    .community-post {
        .community-post-main {
            .article-label {
                .label-left {
                    font-size: 15px;

                    .iconfont {
                        font-size: 16px;
                    }
                }

                .label-right {
                    .upload-document {
                        font-size: 12px;

                        button {
                            padding: 4px 6px;
                        }
                    }
                }
            }

            .article-editor-container {
                min-height: 400px;
            }
        }
    }
}
</style>