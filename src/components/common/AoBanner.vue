<template>
    <div class="ao-banner">
        <div class="carousel" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <div class="carousel-inner" ref="carouselInnerRef"
                :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                <!-- 原始轮播图片 -->
                <div class="carousel-item" v-for="(item, index) in carouselList" :key="index">
                    <a>
                        <img :src="item.img" alt="">
                    </a>
                </div>
            </div>
            <button class="carousel-control prev" @click="handleToPrev">
                <i class="iconfont icon-xiangzuo-1"></i>
            </button>
            <button class="carousel-control next" @click="handleToNext">
                <i class="iconfont icon-xiangyou-1"></i>
            </button>
            <div class="carousel-indicator">
                <span v-for="(_, index) in carouselList.length" :key="index"
                    :class="{ active: indicatorIndex - 1 === index }" @click="handleIndicator(index)"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

import img1 from '@/assets/1.png'
import img2 from '@/assets/2.png'
import img3 from '@/assets/3.png'
import img4 from '@/assets/4.png'

const carouselInnerRef = ref(null)
const currentIndex = ref(1)
const indicatorIndex = ref(1)
const isDisable = ref(false)
let autoPlayTimer = null

const carouselList = ref([
    {
        to: '',
        img: img1
    },
    {
        to: '',
        img: img2
    },
    {
        to: '',
        img: img3
    },
    {
        to: '',
        img: img4
    }
])

onMounted(() => {
    initCarousel()
    startAutoplay(3000, true)
})

onUnmounted(() => {
    startAutoplay(3000, false)
})

const handleMouseEnter = () => {
    console.log("enter");

    startAutoplay(3000, false)
}

const handleMouseLeave = () => {
    console.log("leave");
    startAutoplay(3000, true)
}

const startAutoplay = (time, start) => {
    if (!start) {
        clearInterval(autoPlayTimer)
        autoPlayTimer = null
        return
    }
    clearInterval(autoPlayTimer)
    autoPlayTimer = setInterval(() => handleToNext(),
        time)
}


const handleIndicator = (index) => {
    console.log("指示器index:", index);
    currentIndex.value = index + 1
    indicatorIndex.value = currentIndex.value
}

const initCarousel = () => {
    let first = carouselInnerRef.value.firstElementChild.cloneNode(true)
    let last = carouselInnerRef.value.lastElementChild.cloneNode(true)
    carouselInnerRef.value.appendChild(first)
    carouselInnerRef.value.insertBefore(last, carouselInnerRef.value.firstElementChild)
}

const handleToPrev = () => {
    if (isDisable.value) {
        return
    }
    currentIndex.value--
    indicatorIndex.value = currentIndex.value
    updateCarousel()

    if (currentIndex.value <= 0) {
        indicatorIndex.value = carouselList.value.length
        setTimeout(() => {
            isDisable.value = false
            carouselInnerRef.value.style.transition = 'none';
            currentIndex.value = carouselList.value.length;
        }, 300);
    }
}

const updateCarousel = () => {
    carouselInnerRef.value.style.transition = 'transform .3s ease-in-out'
}

const handleToNext = () => {
    if (isDisable.value) {
        return
    }
    currentIndex.value++
    indicatorIndex.value = currentIndex.value
    updateCarousel()
    if (currentIndex.value > carouselList.value.length) {
        isDisable.value = true
        indicatorIndex.value = 1
        setTimeout(() => {
            isDisable.value = false
            carouselInnerRef.value.style.transition = 'none'
            currentIndex.value = 1
        }, 300)
    }
}

</script>

<style scoped lang="scss">
.ao-banner {
    @include wh(100p);

    .carousel {
        @include wh(100p);
        position: relative;
        overflow: hidden;
        @include b-r($b-r);

        .carousel-inner {
            @include wh(100p);
            display: flex;
            transition: transform 0.3s ease-in-out;
        }

        .carousel-item {
            @include wh(100p);
            flex-shrink: 0;

            img {
                @include wh(100p);
                object-fit: cover;
                @include b-r($b-r);
            }

            &.clone {
                pointer-events: none;
            }
        }

        .carousel-control {
            width: 60px;
            height: 100%;
            position: absolute;
            transition: all 0.3s ease-in-out;
            cursor: pointer;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;

            .iconfont {
                @include c-t {
                    color: color(c-g);
                }

                font-size: 20px;
            }

            &:hover {
                opacity: 1;
            }

            &:disabled {
                cursor: not-allowed;
                opacity: 0.3;
            }
        }

        .prev {
            left: 0;
            top: 0;
            opacity: 0;
        }

        .next {
            right: 0;
            top: 0;
            opacity: 0;
        }

        &:hover .carousel-control {
            opacity: 1;
        }

        .carousel-indicator {
            width: 100%;
            height: 50px;
            padding: 0 20px;
            position: absolute;
            bottom: 0px;
            right: 0px;
            @include flex(c, c);
            gap: 10px;

            span {
                width: 7px;
                height: 7px;
                border-radius: 50%;
                display: inline-block;
                cursor: pointer;
                transition: all 0.3s ease;

                @include c-t {
                    background-color: color(c-g, 0.5);
                }

                &.active {
                    @include c-t {
                        background-color: color(c-g);
                    }

                    transform: scale(1.2);
                }

                &:hover {
                    transform: scale(1.1);

                    @include c-t {
                        background-color: color(c-g);
                    }
                }
            }
        }
    }
}
</style>