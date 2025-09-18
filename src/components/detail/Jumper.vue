<template>
    <div class="jumper">
        <div class="jumper-wrapper">
            <div 
                class="jumper-item" 
                v-for="(item, index) in jumperItems" 
                :key="index"
                @click="handleJump(item.target)"
            >
                <div class="jumper-icon">
                    <span><i :class="['iconfont', item.icon]"></i></span>
                </div>
                <div class="jumper-name">
                    <span>{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['jumperItems'])
const emit = defineEmits(['jumpTo'])

const handleJump = (target) => {
    emit('jumpTo', target)
}
</script>

<style scoped lang="scss">
.jumper {
    @include wh(100p, n);
    padding: 15px 20px;
    box-shadow: shadow(m);
    @include b-r($b-r);
    
    @include c-t {
        background-color: color(c-g);
    }
    
    .jumper-wrapper {
        @include grid(auto-fit, minmax(30px, 1fr));
        
        .jumper-item {
            @include flex(c, c, c);
            gap: 5px;
            cursor: pointer;
            padding: 5px 0;
            transition: all 0.2s ease-out;
            @include b-r($b-r);
            
            &:hover {
                transform: translateY(-2px);
                
                @include c-t {
                    background-color: color(c-p-lightest);
                    color: color(c-g0);
                }
            }
            
            &:active {
                transform: translateY(0);
                transition: all 0.1s ease-out;
            }
            
            .jumper-icon {
                @include flex(c, c);
                
                .iconfont {
                    font-size: 20px;
                    transition: color 0.2s ease-out;
                    
                    @include c-t {
                        color: color(c-s-lighter);
                    }
                }
            }
            
            .jumper-name {
                font-size: 12px;
                transition: color 0.2s ease-out;
                
                @include c-t {
                    color: color(c-g9, 0.6);
                }
            }
        }
    }
}
</style>