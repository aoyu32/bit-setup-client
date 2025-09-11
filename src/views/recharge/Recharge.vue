<template>
  <div class="recharge">
    <div class="recharge-left">
      <div class="recharge-panel-container">
        <RechargePanel />
      </div>
    </div>
    <div class="recharge-right">
      <div class="recharge-explain-container">
        <RechargeExplain />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import RechargePanel from '../../components/recharge/RechargePanel.vue'
import RechargeExplain from '../../components/recharge/RechargeExplain.vue'


</script>

<style lang="scss" scoped>
.recharge {
  @include wh(100p, n);
  min-height: 65vh;
  @include flex(n, c);
  padding: 20px 0;
  gap: 20px;
  

}

.recharge-left {
  @include wh(70p, n);
  
}

.recharge-right {
  @include wh(30p, n);
  
}

</style>