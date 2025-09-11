<template>
  <div class="vip-benefits">
    <div class="benefits-header">
      <h2>VIP专享权益</h2>
      <p>解锁全部功能，享受极致体验</p>
    </div>

    <div class="benefits-list">
      <div v-for="(benefit, index) in benefits" :key="index" class="benefit-item">
        <div class="benefit-icon">
          <span><i :class="['iconfont',benefit.icon]"></i></span>
        </div>
        <div class="benefit-content">
          <p>{{ benefit.title }}</p>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref } from 'vue';

const benefits = ref([
  {
    title: '无限制下载次数',
    icon: 'icon-wuxianzhi1',
  },
  {
    title: '免费高速直链下载',
    icon: 'icon-gaosujifei',
  },
  {
    title: '全站免费下载',
    icon: 'icon-xiazai1',
  },
  {
    title: '无限制智能AI次数',
    icon: 'icon-a-zhinengAI',
  },
  {
    title: '专属VIP标识',
    icon: 'icon-VIP',
  },
  {
    title: '应用上传快速审核',
    icon: 'icon-a-qiyebanjisuban-gongnengquiconhuizong-1231_kuaisushenhe',
  }
]);
</script>

<style lang="scss" scoped>
@use "@/assets/styles/vip/_vip-benefits.scss" as *;
</style>