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
header{
    width: 100%;
    position: fixed;
    z-index: 100;
}
main {
    max-width: $header-width;
    height: 100%;
    margin: 0 auto;
    // background-color: aliceblue;
    padding-top: $header-height;
    
}

@media (max-width:768px) {
    main{
        width: 90%;
    }
    
}
</style>