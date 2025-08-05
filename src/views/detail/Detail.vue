<template>
    <div class="detail">
        <div class="detail-left">
            <div class="left-top">
                <div class="detail-card-container">
                    <DetailCard />
                </div>
            </div>
            <div class="left-center">
                <div class="banner-container">

                </div>
                <div class="intro-container">

                </div>
                <div class="course-container">

                </div>
            </div>
            <div class="left-bottom">
                <div class="detail-comment-container">

                </div>
            </div>
        </div>
        <div class="detail-right">
            <div class="sidebar-container">

            </div>
        </div>
    </div>
</template>
<script setup>
import DetailCard from '@/components/detail/DetailCard.vue';

</script>
<style lang="scss" scoped>
.detail {
    @include wh(100p, 100vh);
    @include flex;
    gap: 20px;

    .detail-left {
        @include wh(70p, 100p);
        .left-top {
            margin-top: 20px;
        }

    }

    .detail-right {
        @include wh(30p, 100p);
        background-color: aliceblue;
    }


}
</style>