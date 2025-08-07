<template>
    <div class="search">
        <div class="search-top" ref="searchTop">
            <div class="search-text slogan">
                寻找你的app <i class="iconfont icon-expression"></i>
            </div>
            <div class="search-input-container">
                <SearchInput />
            </div>
            <div class="search-no-find slogan">
                <span>没找到？</span>
                <a href="">我要求助 <i class="iconfont icon-sad"></i></a>
            </div>
        </div>
        <div class="search-center">
            <div class="search-filter-container">
                <SearchFilter />
            </div>
        </div>
        <div class="search-bottom">
            <div class="search-result-container">
                <SearchResult />
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import SearchFilter from '@/components/search/SearchFilter.vue';
import SearchInput from '@/components/search/SearchInput.vue';
import SearchResult from '@/components/search/SearchResult.vue';



const searchTop = ref(null);

const handleScroll = () => {
    if (searchTop.value) {
        const isScrolled = window.scrollY > 0;
        searchTop.value.classList.toggle('scrolled', isScrolled);
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>
<style scoped lang="scss">
.search {
    @include wh(100p, n);
    min-height: 100vh;
    margin-top: 20px;
    @include flex(c, n, c);
    position: relative;

    @include c-t {
        background-color: color(c-g);
    }


    .search-top {
        @include wh(100p, n);
        @include flex(t, s-b);
        padding: 50px 20px 20px 20px;
        padding-top: 50px;
        padding-bottom: 25px;
        position: sticky;
        top: 40px;
        z-index: 101;

        &.scrolled {
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

            @include c-t {
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
        }

        .slogan {

            padding: 8px 15px;
            font-size: 14px;
            @include b-r(4);

            @include c-t {
                background-color: color(c-p-lighter, 0.2);
                color: color(c-g5);

            }
        }

        .search-no-find {

            @include c-t {
                background-color: color(c-p-darker, 0.2);
                color: color(c-g5);

            }
        }

        .search-input-container {
            width: 47%;
            min-width: 400px;
        }

        @include c-t {
            background-color: color(c-g);
        }
    }

    .search-center {
        @include wh(100p, n);

    }

    .search-bottom {
        @include wh(100p, n);

    }

}

@media (max-width:790px) {
    .search {
        .search-top {
            @include flex(c, c);

            .slogan {
                display: none;
            }
        }
    }
}
</style>