<template>
    <div class="search-input">
        <div class="ao-search-container">
            <AoSearch :suggestion="tips" :history="history" v-model="searchValue" @clear="searchValue = ''"
                @focus="handleFocus" @search="handleSearch" @delete-history="handleDeleteHistory">
                <template #left>
                    <div class="left-search-icon">
                        <span><i class="iconfont icon-sousuo"></i></span>
                    </div>
                </template>
                <template #clear="{ onClear }">
                    <div class="clear-icon" @click="onClear" @mousedown.prevent>
                        <span><i class="iconfont icon-close"></i></span>
                    </div>
                </template>
                <template #right>
                    <div class="search-button" @click="handleSearch" @mousedown.prevent>
                        <button>搜索</button>
                    </div>
                </template>
            </AoSearch>
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import AoSearch from '@/components/common/AoSearch.vue';
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    tips: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    }
})

const emit = defineEmits(['update:modelValue', 'focus', 'search', 'delete-history'])
const searchValue = ref(props.modelValue)

const handleSearch = () => {
    emit('search')
}

watch(() => searchValue.value, (newValue) => {
    if (!newValue) return
    emit('update:modelValue', newValue)
    console.log(newValue);

})

const handleDeleteHistory = (sid) => {
    emit('delete-history', sid)
}

const handleFocus = () => {
    emit('focus')
}

</script>
<style lang="scss" scoped>
@use '@/assets/styles/search/_search-input.scss' as *;
</style>