<template>
    <div class="ao-tabs">
        <div class="tabs-header">
            <div class="tabs">
                <div class="tabs-item" v-for="item in tabs" :key="item.key" @click="handleSwitchTab(item.key)"
                    :class="{ active: activeTab === item.key }">
                    <span>{{ item.label }}</span>
                </div>
            </div>
            <div class="actions">
                <slot name="action"></slot>
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
    @include flex(n, n, c);
    @include b-r($b-r);

    @include wh;


    .tabs-header {
        @include wh(100p, n);
        @include flex(c, s-b);
        padding: 0 15px;

        @include c-t {
            background-color: color(c-p-lighter, 0.5);
            @include b-r($b-r, $b-r, 0, 0);
        }
    }

    .tabs {
        @include flex(c, n);
        padding: 5px 0;
        gap: 10px;



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

    .tab-pane {
        @include wh;
        flex: 1;
        @include flex(c, c);
        // margin-top: 10px;

    }

    .active {
        @include c-t {
            background-color: color(c-g);
        }
    }
}
</style>