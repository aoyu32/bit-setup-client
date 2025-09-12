<template>
    <div class="user">
        <div class="user-top">
            <div class="user-card-container">
                <UserCard />
            </div>
        </div>
        <div class="user-bottom">
            <div class="user-sidebar-container">
                <UserSidebar />
            </div>
            <div class="user-views">
                <router-view>
                </router-view>
            </div>
        </div>
    </div>
</template>
<script setup>
import UserCard from '@/components/user/UserCard.vue';
import UserSidebar from '@/components/user/UserSidebar.vue';
</script>
<style scoped lang="scss">
.user {
    @include wh(100p, n);
    // background-color: color(c-g);
    margin-top: 20px;
    min-height: 100vh;
    position: relative;

    .user-top {
        @include wh;
    }

    .user-bottom {
        @include wh;

        margin-top: 20px;
        gap: 20px;
        @include flex;
        position: sticky;
        top: 72px;

        .user-sidebar-container {
            @include wh(20p, 100p);
        }

        .user-views {

            position: relative;

            position: sticky;
            top: 72px;
            flex: 1;
            padding: 20px;
            bottom: shadow(m);
            @include b-r($b-r);

            @include c-t {
                background-color: color(c-g0);
            }

        }

    }
}

@media (max-width:950px) {
    .user {
        .user-sidebar-container {
            display: none;
        }
    }
}
</style>