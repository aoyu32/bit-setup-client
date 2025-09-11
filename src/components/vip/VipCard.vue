<template>
  <div class="vip-card">
    <div class="card-top">
      <div class="vip-img">
        <img :src="vipImg" alt="">
      </div>
      <div class="vip-text">
        <span>至尊年度会员</span>
      </div>
    </div>
    <div class="card-center">
      <div class="price">
        <div class="vip-price">
          <span>￥</span>
          <span>199</span>
          <span>/年</span>
        </div>
        <div class="vip-origin-price">
          <del>
            ￥299/年
          </del>
        </div>
      </div>
      <div class="limited-offer">
        限时优惠-33%
      </div>
      <div class="vip-content">
        <p>至尊会员，一次开通，全年畅享尊贵特权</p>
      </div>
    </div>
    <div class="card-bottom">
      <div class="active-button">
        <button>立即开通</button>
      </div>
      <div class="protocol">
        开通前请先阅读
        <span>《比特聚合会员协议》</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import vipImg from '@/assets/imgs/vip.svg'
const handlePurchase = () => {
  // 处理购买逻辑
  console.log('开始购买VIP');
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vip/_vip-card.scss" as *;
</style>