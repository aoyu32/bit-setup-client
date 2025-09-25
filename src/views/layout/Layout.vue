<template>
    <header>
        <Header></Header>
    </header>
    <main :class="{ main: isAiView }">
        <router-view />
    </main>
    <footer v-if="!isAiView">
        <Footer></Footer>
    </footer>
    <div class="back-top">
        <BackTop />
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue'
import BackTop from '@/components/layout/BackTop.vue';
import { useUserInfoStore } from '../../stores/user';
import { useRoute } from 'vue-router';
const route = useRoute()
const userStore = useUserInfoStore()
onMounted(() => {
    console.log(localStorage.getItem('uid'));
    userStore.fetchBaseInfo()
})

const isAiView = computed(() => {
    return route.name === 'aiChat' || route.name === 'aiChatWithId'
})


</script>
<style lang="scss" scoped>
header {
    @include wh(100p, $header-height);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

main {
    max-width: $header-width;
    margin-top: $header-height;
    width: 100%;
    height: 100%;
    margin-bottom: 250px;
}

.main {
    margin-bottom: 0;
    max-width: 100%;
    

    @include c-t {
        background-color: color(c-g1);
    }
}

footer {
    @include wh(100p, n);
    @include p-a(b0);
}

@media (max-width:768px) {
    main {
        width: 90%;
        margin-bottom: 470px;
    }
}
</style>