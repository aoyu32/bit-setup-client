<template>
    <div class="article-editor">
        <div class="editor">
            <AoEditor />
        </div>
    </div>
</template>
<script setup>
import AoEditor from '../../common/AoEditor.vue';
</script>
<style scoped lang="scss">
.article-editor {
    @include wh;
    height: 1000px;
    background-color: color(c-g);
}
</style>