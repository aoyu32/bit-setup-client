<template>
    <div class="msg-sidebar">
        <ul>
            <li v-for="(item, index) in items" :key="index">
                <router-link :to="item.route" :class="{ active: $route.path === item.route }">
                    <span><i :class="['iconfont', item.icon]"></i></span>
                    <span>{{ item.name }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
    items: {
        type: Array,
        required: true
    }
})

</script>
<style lang="scss" scoped>
@use '@/assets/styles/message/_msg-sidebar.scss' as *;
</style>