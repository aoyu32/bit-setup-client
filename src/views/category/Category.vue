<template>
    <div class="category">
        <div class="category-top">
            <div class="category-option-container">
                <CategoryOption />
            </div>
        </div>
        <div class="category-bottom">
            <div class="sort-wrapper">
                <div class="app-count">
                    <span>筛选结果 : </span>
                    <span>{{ appCount }}</span>
                </div>
                <div class="app-sort">
                    <ul>
                        <li v-for="(item, index) in sortOption" :key="index">{{ item }}</li>
                        <li>
                            <Switch />
                        </li>
                    </ul>
                </div>

            </div>
            <div class="app-page-container">
                <AppList />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import AppList from '@/components/home/AppList.vue';
import CategoryOption from '@/components/category/CategoryOption.vue';
import Switch from '@/components/common/Switch.vue';
const appCount = ref(100)

const sortOption = ref(['评分', '下载量', '上传日期', '名称', '随机'])

</script>
<style lang="scss" scoped>
.category {
    @include wh;

    .category-top {
        @include wh(100p, n);
        margin: 20px 0;

    }

    .category-bottom {


        .sort-wrapper {
            padding: 0 10px;
            @include wh(100p, 60);
            margin-bottom: 20px;
            background-color: color(c-g);
            @include flex(c, s-b);

            .app-sort {
                @include flex(c, c);

                ul {
                    @include flex(c,c);
                    gap: 10px;

                    li {
                        padding-left: 10px;
                    }
                }
            }

        }

    }

}
</style>