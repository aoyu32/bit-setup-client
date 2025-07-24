<template>
    <header>
        <Header></Header>
    </header>
    <main>
        <router-view />
    </main>
    <footer>
        <Footer></Footer>
    </footer>
</template>
<script setup>
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue'

</script>
<style lang="scss" scoped>
header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
}

main {
    max-width: $header-width;
    padding: $header-height 0;
    width: 100%;
    margin-bottom: 100px;
}

footer {
    width: 100%;
    height: 100px;
    @include p-a(b0);
}

@media (max-width:768px) {
    main {
        width: 90%;
    }
}
</style>