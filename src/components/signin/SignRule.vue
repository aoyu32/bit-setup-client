<template>
    <div class="sign-rule">
        <div class="sign-rule-label">
            <span>签到规则须知：</span>
        </div>
        <div class="rule-list">
            <ul>
                <li>每日签到可随机获得 <span class="highlight">1-3个A币</span></li>
                <li>连续签到3天额外获得 <span class="highlight">2-4个A币</span></li>
                <li>连续签到7天额外获得 <span class="highlight">3-5个A币</span></li>
                <li>每日签到时间：<span class="highlight">00:00 - 23:59</span></li>
                <li>每个用户每天只能签到一次</li>
                <li>连续签到中断后将重新计算天数</li>
                <li>每日根据签到时间排名，越早签到排名越靠前</li>
                <li>排名榜单每日00:00自动刷新</li>
                <li>前10名用户将获得额外 <span class="highlight">1-2个A币</span> 奖励</li>
                <li>恶意刷签到将被永久封禁签到功能</li>
                <li>平台保留对签到规则的最终解释权</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
// 签到规则组件
</script>

<style lang="scss" scoped>
.sign-rule {
    padding: 20px;
    @include b-r($b-r);

    @include c-t {
        background-color: color(c-g);
    }

    box-shadow: shadow(m);

    .sign-rule-label {
        margin-bottom: 5px;

        span {
            font-size: 17px;
            font-weight: 600;

            @include c-t {
                color: color(c-g7);
            }
        }
    }

    .rule-list {
        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                position: relative;
                padding: 10px 0 10px 20px;
                font-size: 14px;
                line-height: 1.5;

                @include c-t {
                    color: color(c-g5);
                    border-bottom: 1px solid color(c-g1, 0.7);
                }

                &:last-child {
                    border-bottom: none;
                }

                &::before {
                    content: '•';
                    position: absolute;
                    left: 0;
                    color: #4f46e5;
                    font-weight: bold;
                    font-size: 16px;
                }

                .highlight {
                    color: #e11d48;
                    font-weight: 600;
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .sign-rule {
        margin: 16px;
        padding: 20px;
    }
}
</style>