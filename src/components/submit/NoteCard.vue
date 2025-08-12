<template>
    <div class="note-card">
        <div class="recommend-note" v-if="$route.path === '/submit/recommend'">
            <div class="welcome">
                <p>欢迎您为比特聚合平台推荐优质应用！感谢您为我们的应用生态社区贡献宝贵资源。为确保社区品质，请在提交前仔细阅读以下平台规范，携手共建美好应用生态🥰</p>
            </div>
            <div class="recommend-standard">
                <ul>
                    <li v-for="(item, index) in recommendStandard" :key="index">{{ item }}</li>
                </ul>
            </div>
        </div>
        <div class="developer-note" v-if="$route.path === '/submit/developer'">
            <div class="welcome">
                <p>感谢您选择比特聚合平台分享您的优秀应用！我们相信您的产品将深受用户喜爱。为打造优质应用生态社区，请在提交应用前仔细阅读以下平台规范☺️</p>
            </div>
            <div class="developer-standard">
                <ul>
                    <li v-for="(item, index) in developerStandard" :key="index">{{ item }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const recommendStandard = ref([
    "推荐的应用必须为正版且来源可靠，禁止提交未经授权的盗版或破解应用。",
    "不得推荐含有恶意代码、病毒或可能危害用户设备安全的应用。",
    "推荐内容需严格遵守法律法规，禁止涉及政治敏感、色情、暴力等不当内容。",
    "请提供准确的应用信息，包括应用名称、分类及详细描述（如适用）。",
    "提交信息越完整，审核通过率越高。请尽量提供官网地址、下载链接及应用截图等信息。"
])

const developerStandard = ref([
    "提交的应用需为开发者原创或具备合法授权，禁止上传未经许可的第三方应用。",
    "应用需通过基本功能与安全测试，确保无明显漏洞或崩溃问题。",
    "禁止上传含有违法、侵权或不道德内容的应用，平台将进行严格审核。",
    "请提供详尽的应用介绍，并完整填写所有必填表单项。",
    "为验证开发真实性，请提交GitHub或Gitee仓库的源码地址及提交记录截图。",
    "公有仓库需提供至少10条提交记录。",
    "私有仓库需提供至少10条代码提交记录截图，包括一条含平台验证信息的README文件、提交记录及仓库私有状态截图。"
])
</script>
<style lang="scss" scoped>
@use '@/assets/styles/submit/_note-card.scss' as *;
</style>