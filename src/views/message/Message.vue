<template>
    <div class="msg">
        <div class="msg-left">
            <div class="message-sidebar-container">
                <MessageSidebar :items="msgNavItems" />
            </div>
        </div>
        <div class="msg-right">
            <div class="message-header">
                <MessageHeader :label="labelName" />
            </div>
            <div class="msg-views">
                <router-view>
                </router-view>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import MessageSidebar from '@/components/message/MessageSidebar.vue';
import MessageHeader from '@/components/message/MessageHeader.vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const msgNavItems = ref([
    {
        icon: 'icon-xinxi',
        name: '评论与回复',
        route: '/message/comment'
    },
    {
        icon: 'icon-like',
        name: '点赞与收藏',
        route: '/message/like'
    },
    {
        icon: 'icon-plus',
        name: '新增关注',
        route: '/message/follow'
    },
    {
        icon: 'icon-asset-monitor',
        name: '系统消息',
        route: '/message/system'
    }

])
const labelName = computed(() => {
    const navItem = msgNavItems.value.find(item => route.path === item.route)
    return navItem ? { icon: navItem.icon, name: navItem.name } : ''
})

</script>
<style scoped lang="scss">
.msg {
    @include wh(100p, n);
    @include flex;
    padding-top: 20px;
    gap: 25px;
    position: relative;

    .msg-left {
        @include wh(16p, 100vh);
        position: sticky;
        top: $header-height;
    }


    .message-sidebar-container {
        position: sticky;
        top: $header-height;
        @include wh;
    }

    .msg-right {
        @include flex(n, n, c);
        gap: 20px;
        @include wh(100p, n);
        flex: 1;
    }

    .msg-views {
        @include wh(100p, n);
    }

}

@media (max-width:990px) {
    .msg {
        .msg-left {
            display: none;
        }
    }
}
</style>