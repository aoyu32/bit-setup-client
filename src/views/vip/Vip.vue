<template>
  <div class="vip">
    <div class="vip-header">
      <h1 class="vip-title">比特聚合至尊VIP年度会员</h1>
      <p class="vip-subtitle">解锁全部功能，享受专属特权</p>
    </div>

    <div class="vip-wrapper">
      <div class="vip-left">
        <div class="vip-card-container">
          <VipCard />
        </div>
      </div>

      <div class="vip-right">
        <div class="vip-benefits-container">
          <VipBenefits />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import VipBenefits from '../../components/vip/VipBenefits.vue';
import VipCard from '../../components/vip/VipCard.vue';
onMounted(() => {
  const app = document.querySelector('#app')
  app.style.background = 'linear-gradient(135deg, #1A1A1A 0%, #2E2E2E 50%, #434343 100%)'
})
onUnmounted(() => {
  const app = document.querySelector('#app')
  app.style.background = '#e9ecef'
})
</script>

<style lang="scss" scoped>
.vip {
  @include wh(100p, 100vh);
  padding: 2rem;
  @include flex(n, n, c);

}

.vip-header {
  text-align: center;
  z-index: 1;

  .vip-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;

    @include c-t {
      color: color(c-g);
      text-shadow: 0 2px 20px color(c-g9, 0.2);
    }

    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .vip-subtitle {
    font-size: 1.2rem;

    @include c-t {
      color: color(c-g);
    }

    font-weight: 400;
    margin: 0;
  }
}

.vip-wrapper {
  padding: 50px 0;
  @include flex(n, c);
  gap: 3rem;
  width: 100%;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.vip-card-container {
  height: 100%;
  min-width: 400px;
}
</style>