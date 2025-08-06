<template>
    <div class="ao-list">
        <div class="ao-header">
            <div class="header-left">
                <slot name="title"></slot>
            </div>
            <div class="header-right">
                <slot name="more">
                </slot>
            </div>
        </div>
        <div class="ao-main">
            <template v-if="!list || list.length === 0">
                <div class="no-data">
                    <slot name="empty">暂无数据</slot>
                </div>
            </template>
            <a v-for="(item, index) in list" v-else>
                <slot name="item" :item="item" :index="index">
                </slot>
            </a>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['list'])
</script>
<style lang="scss" scoped>
.ao-list {
    @include wh;
    @include flex(n, c, c);
    padding: 20px 15px 5px 15px;

    @include c-t {
        background-color: color(c-g);
    }

    box-shadow: shadow(m);

    .ao-header {
        @include flex(c, s-b);

        .header-left {
            @include flex(c, n);
            gap: 5px;
            font-size: 15px;
            font-weight: 550;

            @include c-t {
                color: color(c-p-lighter);
            }

            .iconfont {
                font-size: 17px;
            }
        }

        .header-right {
            font-size: 12px;
            cursor: pointer;

            @include c-t {
                color: color(c-p-lighter);
            }
        }
    }


    .ao-main {
        @include wh;
        @include flex(n, n, c);
        margin-top: 10px;

        .no-data {
            @include flex(c, c, c);
            padding: 20px 15px 25px 15px;
            font-size: 14px;
        }

        a {
            @include wh;
            @include flex(c, s-b);
            padding: 15px 0px;
            font-size: 13px;
            transition: all 0.2s ease-in-out;

            @include c-t {
                color: color(c-g7);
            }

            &:hover {
                @include c-t {
                    color: color(c-p-lighter);
                }
            }
        }
    }

}
</style>