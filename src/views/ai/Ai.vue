<template>
    <div class="ai">
        <div class="ai-left">
            <div class="ai-sidebar-container">
                <AiSidebar @foldSidebar="handleFoldSidebar" />
            </div>
        </div>
        <div class="ai-right" :style="{ marginLeft: aiRightMargin }">
            <div class="ai-window-container">

            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import AiSidebar from '@/components/ai/AiSidebar.vue';

const isFoldSidebar = ref(false)
const aiRightMargin = computed(() => isFoldSidebar.value ? '250px' : '70px')
const handleFoldSidebar = (value) => {
    isFoldSidebar.value = value
}

</script>
<style lang="scss" scoped>
.ai {
    @include flex;
    position: relative;
    @include wh(100p, 100vh);

    .ai-left {
        @include wh(n, 100p);
        position: fixed;

    }

    .ai-right {
        @include wh(100p, 100p);
        margin-left: 250px;

        @include c-t {
            background-color: color(c-g2);
        }
    }
}
</style>