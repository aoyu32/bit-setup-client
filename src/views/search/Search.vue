<template>
    <div class="search">
        <div class="search-top" ref="searchTop">
            <div class="search-text slogan">
                寻找你的app <i class="iconfont icon-expression"></i>
            </div>
            <div class="search-input-container">
                <SearchInput v-model="searchValue" :tips="tipsList" @focus="handleFocus" @search="handleSearch" />
            </div>
            <div class="search-no-find slogan">
                <span>没找到？</span>
                <a href="">我要求助 <i class="iconfont icon-sad"></i></a>
            </div>
        </div>
        <div class="search-center">
            <div class="search-filter-container">
                <SearchFilter @filter-change="handleFilterChange" />
            </div>
        </div>
        <div class="search-bottom">
            <div class="search-result-container">
                <SearchResult :data="appList" @page-change="handlePageChange" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
import SearchFilter from '@/components/search/SearchFilter.vue';
import SearchInput from '@/components/search/SearchInput.vue';
import SearchResult from '@/components/search/SearchResult.vue';
import { useSearchStore } from '../../stores/search';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter()
const searchValue = ref(route.query.keyword)
const searchStore = useSearchStore()
const searchTop = ref(null);
const currentPageNum = ref(1)

const handleScroll = () => {
    if (searchTop.value) {
        const isScrolled = window.scrollY > 0;
        searchTop.value.classList.toggle('scrolled', isScrolled);
    }
};

const handlePageChange = (pageNum) => {
    fetchAppList(pageNum, 20)
    currentPageNum.value = pageNum
}

const handleFilterChange = (filterData) => {
    console.log("过滤条件", filterData);
    if (searchValue.value === '') {
        return
    }
    filterData.keyword = searchValue.value
    searchStore.fetchSearchApps(currentPageNum.value, 20, filterData)


}

const handleFocus = () => {
    searchStore.fetchSearchTips(searchValue.value)
}

const handleSearch = () => {
    router.push({
        path: '/search',
        query: {
            keyword: searchValue.value
        }
    })
    fetchAppList(1, 20)

}

const appList = computed(() => {
    return searchStore.searchApps
})

const tipsList = computed(() => searchStore.searchTips)

onMounted(() => {
    fetchAppList(1, 20)
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

watch(() => searchValue.value, (newValue) => {
    searchStore.fetchSearchTips(newValue)
})

const fetchAppList = (pageNum, pageSize) => {
    searchStore.fetchSearchApps(pageNum, pageSize, {
        keyword: searchValue.value,
        sortType: 0,
        size: '',
        pricingModel: ''
    })
}

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
            box-shadow: shadow(l);
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