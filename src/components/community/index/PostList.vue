<template>
    <div class="post-list">
        <slot></slot>
    </div>
</template>
<script setup>

</script>
<style scoped lang="scss">
.post-list {
    @include wh;
    @include flex(c, c, c);

    &:last-child {
        .card-footer {

            @include c-t {
                border-bottom: 0;
            }

        }
    }
}
</style>