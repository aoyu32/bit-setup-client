<template>
    <div class="ao-tabs">
        <div class="tabs">
            <div class="tabs-item" v-for="item in tabs" :key="item.key" @click="handleSwitchTab(item.key)"
                :class="{ active: activeTab === item.key }">
                <span>{{ item.label }}</span>
            </div>
        </div>
        <div class="tab-pane">
            <slot name="content">
                <div class="default-content">
                    <p>默认标签页内容</p>
                </div>
            </slot>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    tabs: {
        type: Array,
        required: true
    },
    default: {
        type: String
    }
})
const emit = defineEmits(['update:modelValue'])
const activeTab = ref(props.modelValue || props.default)
const handleSwitchTab = (key) => {
    activeTab.value = key
    emit('update:modelValue', key)
}

watch(() => props.modelValue, (newValue) => {
    if (newValue !== undefined && newValue !== activeTab.value) {
        activeTab.value = newValue
    }
})

onMounted(() => {
    if (props.modelValue) {
        activeTab.value = props.modelValue
    } else if (props.default) {
        activeTab.value = props.default
        emit('update:modelValue', props.default)
    } else if (props.tabs.length > 0) {
        activeTab.value = props.tabs[0].key
        emit('update:modelValue', props.tabs[0].key)
    }

})

</script>
<style scoped lang="scss">
.ao-tabs {
    @include b-r($b-r);



    .tabs {
        @include wh;
        @include flex(c, n);
        padding: 5px 15px;
        gap: 10px;

        @include c-t {
            background-color: color(c-p-lighter, 0.5);
            @include b-r($b-r);
        }

        .tabs-item {
            @include b-r($b-r);
            font-size: 14px;
            cursor: pointer;
            padding: 7px 20px;

            @include c-t {
                color: color(c-g9, 0.6);
            }
        }
    }

    .tab-pane{
        @include wh;
        min-height: 200px;
        @include flex(c,c);
        margin: 10px 0;
        
    }

    .active {
        @include c-t {
            background-color: color(c-g);
        }
    }
}
</style>