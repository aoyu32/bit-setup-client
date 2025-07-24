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
.footer {
    width: 100%;
    background-color: color(c-g2);
    border-top: 1px solid color(c-g1);
    padding: 40px 0;

    .footer-content {
        max-width: $header-width;
        margin: 0 auto;
        @include flex(t, s-b);
        gap: 40px;
    }

    .footer-left {
        flex: 1;
        min-width: 250px;
        @include flex(l, n, c);
        display: flex;
        flex-direction: column;
        gap: 12px;

        .footer-logo {
            @include flex(c, l);
            gap: 12px;

            .logo-img {

                @include wh(60);

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }

            .logo-name {
                span {
                    font-size: 24px;
                    font-weight: 600;
                    color: color(c-p);
                    letter-spacing: 1px;
                }
            }
        }

        .copyright {
            p {
                font-size: 14px;
                color: color(c-g8, 0.7);
                margin: 0;
                font-weight: 500;
            }
        }

        .footer-links {
            @include flex(c, n);
            gap: 12px;

            .footer-link {
                color: color(c-g7);
                text-decoration: none;
                font-size: 14px;
                font-weight: 500;
                transition: color 0.3s ease;

                &:hover {
                    color: color(c-p-light);
                }
            }

            .separator {
                color: color(c-g4, 0.5);
                font-size: 14px;
            }
        }
    }

    .footer-center {
        flex: 2;
        min-width: 350px;

        .disclaimer {
            h4 {
                font-size: 16px;
                color: color(c-g7);
                margin: 0 0 16px 0;
                font-weight: 600;
            }

            p {
                font-size: 13px;
                color: color(c-g5);
                line-height: 1.6;
                margin: 0 0 8px 0;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }

    .footer-right {
        flex: 1;
        min-width: 180px;

        .qr-codes {
            gap: 24px;
            @include flex(c, r);

            .qr-item {
                @include flex(c, n, c);
                gap: 8px;

                .qr-img {
                    width: 80px;
                    height: 80px;
                    border: 1px solid color(c-g);
                    border-radius: 8px;
                    padding: 4px;
                    background-color: color(c-g);
                    box-shadow: shadow(m);

                    img {
                        @include wh;
                        object-fit: cover;
                        border-radius: 4px;
                    }
                }

                .qr-label {
                    font-size: 12px;
                    color: color(c-g6);
                    font-weight: 500;
                    text-align: center;
                }
            }
        }
    }
}

// 响应式设计
@media (max-width: 1024px) {
    .footer {
        .footer-content {
            gap: 30px;
        }

        .footer-right {
            .qr-codes {
                gap: 16px;

                .qr-item {
                    .qr-img {
                        width: 70px;
                        height: 70px;
                    }

                    .qr-label {
                        font-size: 11px;
                    }
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .footer {
        padding: 30px 0;

        .footer-content {
            @include flex(c, n, c);
            gap: 30px;
            padding: 0 16px;
        }

        .footer-left {
            gap: 20px;
            min-width: auto;
            @include flex(c, c);

            .footer-logo {
                .logo-img {
                    width: 36px;
                    height: 36px;
                }

                .logo-name span {
                    font-size: 20px;
                }
            }

            .copyright p {
                font-size: 13px;
            }

            .footer-links {
                .footer-link {
                    font-size: 13px;
                }
            }
        }

        .footer-center {
            min-width: auto;

            .disclaimer {
                @include flex(c, c, c);

                h4 {
                    font-size: 15px;
                    margin-bottom: 12px;
                }

                p {
                    font-size: 12px;
                    margin-bottom: 6px;
                }
            }
        }

        .footer-right {
            @include flex(c, c);
            min-width: auto;

            .qr-codes {
                justify-content: center;
                gap: 20px;

                .qr-item {
                    .qr-img {
                        width: 75px;
                        height: 75px;
                    }

                    .qr-label {
                        font-size: 12px;
                    }
                }
            }
        }
    }
}

@media (max-width: 480px) {
    .footer {
        .footer-left {
            .footer-links {
                flex-direction: column;
                gap: 8px;
                align-items: flex-start;

                .separator {
                    display: none;
                }
            }
        }

        .footer-right {
            .qr-codes {
                gap: 16px;

                .qr-item {
                    .qr-img {
                        width: 65px;
                        height: 65px;
                    }

                    .qr-label {
                        font-size: 11px;
                    }
                }
            }
        }
    }
}
</style>