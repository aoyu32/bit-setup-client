<template>
    <div class="recharge-panel">
        <div class="panel-header">
            <div class="panel-label">
                <h3>A币充值中心</h3>
            </div>
            <div class="my-balance">
                <div>我的余额：</div>
                <div class="balance-num">
                    <div>100</div>
                    <div class="coin"><img :src="aCoinImg" alt=""></div>
                </div>
            </div>
        </div>
        <div class="panel-main">
            <div class="amount-input">
                <div class="amount-input-wrapper">
                    <input type="number" placeholder="请输入充值金额">
                    <!-- <div class="adjust-amount">
                        <div class="add">
                            <i
                                class="iconfont icon-a-namejiantoufangxiangshangzhuangtainullxingzhuangshixinyanseheiweizhiDefault"></i>
                        </div>
                        <div class="subtract">
                            <i
                                class="iconfont icon-a-namejiantoufangxiangxiazhuangtainullxingzhuangshixinyanseheiweizhiDefault"></i>
                        </div>
                    </div> -->
                    <div class="unit">
                        元
                    </div>
                </div>
            </div>
            <div class="amount-number">
                <div class="number-item" v-for="(num, index) in amountNumber">{{ num }}</div>
            </div>
        </div>
        <div class="panel-footer">
            <div class="settle-accounts">
                <div class="recharge-info">
                    <div class="quantity">
                        <div class="label">数量：</div>
                        <div class="value">10</div>
                        <div class="unit">个</div>
                    </div>
                    <div class="discount">
                        <div class="label">折扣：</div>
                        <div class="unit">-￥</div>
                        <div class="value">2</div>
                    </div>
                    <div class="payment-amount">
                        <div class="label pay">支付金额：</div>
                        <div class="unit pay">￥</div>
                        <div class="value pay">8</div>

                    </div>
                </div>
                <div class="submit-recharge">
                    <button>立即充值</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import aCoinImg from '@/assets/imgs/coin.svg'

const amountNumber = ref([5, 10, 20, 30, 40, 50, 60, 90])



</script>
<style scoped lang="scss">
@use '@/assets/styles/recharge/_recharge-panel.scss' as *;
</style>