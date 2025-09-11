<template>
    <div class="recharge-explain">
        <div class="explain-container">
            <div class="exchange-info">
                <div class="exchange-card">
                    <div class="exchange-rate">{{ exchangeInfo.rate }}</div>
                    <div class="exchange-desc">{{ exchangeInfo.desc }}</div>
                </div>
            </div>
            <div class="rules-list">
                <div v-for="(rule, index) in rules" :key="index" class="rule-item">
                    <div class="bullet"></div>
                    <div class="text" v-html="rule"></div>
                </div>
            </div>


        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 充值规则数据
const rules = ref([
    '最低充值金额：<span class="highlight">1元</span>',
    '单次最高充值金额：<span class="highlight">10000元</span>',
    '充值到账时间：<span class="time">即时到账</span>',
    '支持支付方式：微信支付、支付宝',
    '充值记录可在个人中心查看',
    'A币永久有效，不设过期时间',
    '充值成功后不支持退款',
    '如遇充值异常请联系客服处理',
    '平台保留对充值规则的最终解释权'
])

// 兑换信息数据
const exchangeInfo = reactive({
    rate: '1元等价于10A币',
    desc: '充值的 A币为虚拟货币，不可提现或退还，请谨慎操作。'
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/recharge/_recharge-explain.scss' as *;
</style>