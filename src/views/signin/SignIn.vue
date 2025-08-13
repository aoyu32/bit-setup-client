<template>
    <div class="sign-in">
        <div class="sign-in-left">
            <div class="sign-calendar-container">
                <SignCalendar />
            </div>
            <div class="sign-ranking-container">
                <SignRanking />
            </div>
        </div>
        <div class="sign-in-right">

        </div>
    </div>
</template>
<script setup>
import SignCalendar from '../../components/signin/SignCalendar.vue';
import SignRanking from '../../components/signin/SignRanking.vue';

</script>
<style lang="scss" scoped>
.sign-in {
    @include wh(100p, 100vh);
    padding-top: 20px;

    .sign-in-left {
        @include flex(n,n,c);
        @include wh(70p, n);
        gap: 20px;
    }



}
</style>