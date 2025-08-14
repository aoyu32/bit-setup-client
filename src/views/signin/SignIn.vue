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
            <div class="sign-stats-container">
                <SignStats />
            </div>
            <div class="sign-role-container">
                <SignRule />
            </div>
        </div>
    </div>
</template>
<script setup>
import SignCalendar from '../../components/signin/SignCalendar.vue';
import SignRanking from '../../components/signin/SignRanking.vue';
import SignStats from '../../components/signin/SignStats.vue';
import SignRule from '../../components/signin/SignRule.vue';

</script>
<style lang="scss" scoped>
.sign-in {
    @include wh(100p, 100p);
    @include flex;
    gap: 20px;
    padding-top: 20px;

    .sign-in-left {
        @include flex(n, n, c);
        @include wh(70p, 100%);
        gap: 20px;
    }

    .sign-in-right {
        @include wh(30p, 100p);
        @include flex(n, n, c);
        gap: 20px;
    }

}
</style>