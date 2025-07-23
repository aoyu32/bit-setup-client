<template>
    <div class="home-banner">
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
        img: img1
    },
    {
        to: '',
        img: img2
    },
    {
        to: '',
        img: img3
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
 @use '@/assets/styles/home/_home-banner.scss' as *;

</style>