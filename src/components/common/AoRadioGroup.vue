<template>
    <div class="ao-radio-group">
        <div class="ao-radio-item" v-for="item in options" :key="item.value" @click="handleChange(item.value)">
            <div class="radio">
                <div class="radio-inner" :class="{ active: isActive(item.value) }"></div>
            </div>
            <div class="label">
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    options: {
        type: Array,
        required: true,
        validator: (value) => {
            return value.every(item =>
                item && typeof item.label !== 'undefined' && typeof item.value !== 'undefined'
            )
        }
    }
})

const innerValue = ref(props.modelValue)


watch(() => props.modelValue, (newVal) => {
    innerValue.value = newVal
})

const isActive = (value) => {
    return innerValue.value === value
}

const handleChange = (value) => {
    innerValue.value = value
    emit('update:modelValue', value)
}
</script>

<style scoped lang="scss">
.ao-radio-group {
    display: flex;
    align-items: center;
    gap: 20px;
    user-select: none;

    .ao-radio-item {
        font-size: 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;

        .radio {
            width: 15px;
            height: 15px;
            border: 1px solid color(c-p);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            .radio-inner {
                width: 90%;
                height: 90%;
                border-radius: 50%;
                transition: background-color 0.2s;

                &.active {
                    background-color: color(c-p-lighter);
                }
            }
        }
    }
}
</style>