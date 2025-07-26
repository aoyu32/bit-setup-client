<template>
    <div class="footer">
        <div class="footer-content">
            <!-- 左侧区域 -->
            <div class="footer-left">
                <!-- Logo区域 -->
                <div class="footer-logo">
                    <div class="logo-img">
                        <img src="../../assets/logo.svg" alt="比特聚合">
                    </div>
                    <div class="logo-name">
                        <span>比特聚合</span>
                    </div>
                </div>

                <!-- 版权信息 -->
                <div class="copyright">
                    <p>© 2025 aoyu. All rights reserved.</p>
                </div>

                <!-- 链接区域 -->
                <div class="footer-links">
                    <a href="#" class="footer-link">关于我们</a>
                    <span class="separator">|</span>
                    <a href="mailto:contact@example.com" class="footer-link">联系邮箱</a>
                </div>
            </div>

            <!-- 中间区域 -->
            <div class="footer-center">
                <!-- 免责声明 -->
                <div class="disclaimer">
                    <h4>免责声明</h4>
                    <p>本站所有资源均来自互联网，仅供学习和研究使用。</p>
                    <p>如果您认为本站侵犯了您的合法权益，请及时联系我们。</p>
                    <p>我们将在收到通知后第一时间删除相关内容。</p>
                    <p>本站不承担任何由于内容的使用所引起的争议和法律责任。</p>
                </div>
            </div>

            <!-- 右侧区域 -->
            <div class="footer-right">
                <div class="qr-codes">
                    <!-- 官方微信 -->
                    <div class="qr-item">
                        <div class="qr-img">
                            <img :src="wechatImg" alt="官方微信二维码">
                        </div>
                        <span class="qr-label">官方微信</span>
                    </div>

                    <!-- 官方QQ群 -->
                    <div class="qr-item">
                        <div class="qr-img">
                            <img :src="qqImg" alt="官方QQ群二维码">
                        </div>
                        <span class="qr-label">官方QQ群</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import wechatImg from '@/assets/imgs/qr-code/wechat.png'
import qqImg from '@/assets/imgs/qr-code/qq.jpg'
</script>

<style scoped lang="scss">
@use '@/assets/styles/layout/footer.scss' as *;
</style>