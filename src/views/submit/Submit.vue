<template>
    <div class="submit">
        <div class="submit-top">
            <SubmitHeader />
        </div>
        <div class="submit-center">
            <div class="note-card-container">
                <NoteCard />
            </div>
        </div>
        <div class="submit-bottom">
            <router-view>
            </router-view>
        </div>
    </div>
</template>
<script setup>
import NoteCard from '../../components/submit/NoteCard.vue';
import SubmitHeader from '../../components/submit/SubmitHeader.vue';

</script>
<style lang="scss" scoped>
.submit {
    @include wh(100p, n);

    .submit-top{
        @include wh(100p,n);
        margin: 20px 0;

    }

    .submit-center{
        @include wh(100p,n);

        .note-card-container{
            @include wh(100p,n);
            @include flex(n,c);
        }
    }

    .submit-bottom{
        margin-top: 20px;

    }
}
</style>