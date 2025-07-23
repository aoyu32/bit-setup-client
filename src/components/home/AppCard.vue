<template>
    <div class="app-card" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" ref="appCardRef">
        <div id="card-content-front" class="card-content" :class="{ 'is-flipped': isDraw }" v-if="cardSide === 'front'">
            <div class="card-draw" v-if="isShowCardDraw" @mouseenter="handleDrawMouseEnter"
                @mouseleave="handleDrawMouseLeave" @click="handleDrawClick">
                <button>
                    <i class="iconfont icon-fanzhuan1"></i>
                </button>
            </div>
            <div class="mark-wrapper left-mark">
                <div class="app-mark">
                    <span>10A币</span>
                </div>
                <div class="app-mark">
                    <span>免费</span>
                </div>
            </div>
            <div class="mark-wrapper right-mark">
                <div class="app-mark">
                    <span>最新</span>
                </div>
                <div class="app-mark">
                    <span>独立开发</span>
                </div>
                <div class="app-mark">
                    <span>自动安装</span>
                </div>
            </div>
            <div class="card-top">
                <div class="app-img">
                    <img :src="app.img" alt="Chrome">
                </div>
            </div>
            <div class="card-bottom">
                <div class="app-name">
                    <span>{{ app.name }}</span>
                </div>
                <div class="app-category">
                    <span>{{ app.category }}</span>
                </div>
                <div class="app-download">
                    <span><i class="iconfont icon-download"></i></span>
                    <span>{{ app.downloads }}</span>
                </div>
            </div>
        </div>
        <div id="card-content-back" class="card-content" ref="cardContentRef" v-else>
            <div class="card-draw" v-if="isShowCardDraw" @mouseenter="handleDrawMouseEnter"
                @mouseleave="handleDrawMouseLeave" @click="handleDrawClick">
                <button>
                    <i class="iconfont icon-fanzhuan1"></i>
                </button>
            </div>
            <div class="app-rating">
                <span>{{ app.rating }}</span>
                <span><i class="iconfont icon-star"></i></span>
            </div>
            <div class="card-top">
                <div class="app-bio">
                    <p>{{ app.bio }}</p>
                </div>
            </div>
            <div class="card-bottom">
                <div class="card-logo">
                    <img src="../../assets/logo.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps(['app'])
const appCardRef = ref(null)
const cardContentRef = ref(null)

onMounted(() => {
})
const isShowCardDraw = ref(false)
const isHoveringDraw = ref(false) // 新增：标记是否悬浮在card-draw上
const isDraw = ref(false)
const cardSide = ref('front')

const handleDrawClick = () => {
    appCardRef.value.style.transition = 'transform 0.3s ease-out'
    isDraw.value = !isDraw.value
    if (isDraw.value) {
        appCardRef.value.style.transform = 'rotateY(180deg)'
        cardSide.value = 'back'
    } else {
        appCardRef.value.style.transform = 'rotateY(0deg)'
        cardSide.value = 'front'
    }
}

const handleMouseMove = (e) => {
    isShowCardDraw.value = true

    // 如果鼠标在card-draw区域内，不执行3D效果
    if (isHoveringDraw.value) {
        return
    }

    //获取事件元素
    const card = e.currentTarget
    //获取元素几何
    const cardRect = card.getBoundingClientRect()
    //计算鼠标相对于元的位置
    const relativeX = e.clientX - cardRect.left
    const relativeY = e.clientY - cardRect.top

    //计算中心距离
    const centerX = cardRect.width / 2
    const centerY = cardRect.height / 2

    //计算旋转距离
    const rotateX = -(centerX - relativeX)
    const rotateY = centerY - relativeY

    //旋转比例
    const routeRate = 7
    //缩放距离
    const scaleSize = 50
    //景深
    const perspectiveSize = 1000
    //阴影模糊半径
    const shadowSize = 30
    //阴影颜色
    const shadowColor = `rgba(0,0,0,0.15)`
    if (isDraw.value) {
        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.320, 1), box-shadow 1s cubic-bezier(0.23, 1, 0.320, 1)';
        card.style.transform = `perspective(${perspectiveSize}px) rotateX(${rotateY / routeRate}deg) rotateY(${180 - (-rotateX / routeRate)}deg ) translateZ(-${scaleSize}px)`
        card.style.boxShadow = `
        ${(centerX - relativeX) / 4}px 
        ${(relativeY - centerY) / 4}px 
        ${shadowSize}px ${shadowColor},
        0 20px 40px rgba(74, 145, 226, 0.1)
    `;

    } else {
        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.320, 1), box-shadow 1s cubic-bezier(0.23, 1, 0.320, 1)';
        card.style.transform = `perspective(${perspectiveSize}px) rotateX(${rotateY / routeRate}deg) rotateY(${rotateX / routeRate}deg) translateZ(${scaleSize}px)`
        card.style.boxShadow = `
        ${(relativeX - centerX) / 4}px 
        ${(relativeY - centerY) / 4}px 
        ${shadowSize}px ${shadowColor},
        0 20px 40px rgba(74, 145, 226, 0.1)
    `;
    }
}

const handleMouseLeave = (e) => {
    isShowCardDraw.value = false
    isHoveringDraw.value = false // 重置状态
    const card = e.currentTarget;
    // 添加过渡动画让回到原始状态更平滑
    if (isDraw.value) {
        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.320, 1), box-shadow 1s cubic-bezier(0.23, 1, 0.320, 1)';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(180deg) translateZ(0px)';
        card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';

    } else {

        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.320, 1), box-shadow 1s cubic-bezier(0.23, 1, 0.320, 1)';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
    }
}

// 新增：处理card-draw的鼠标进入事件
const handleDrawMouseEnter = (e) => {
    isHoveringDraw.value = true
    // 应用轻微的3D效果
    const card = e.currentTarget.parentElement.parentElement;
    if (isDraw.value) {

        card.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(182deg) translateZ(10px)';
        card.style.boxShadow = '2px 2px 15px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(74, 145, 226, 0.05)';
    } else {
        card.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(2deg) translateZ(10px)';
        card.style.boxShadow = '2px 2px 15px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(74, 145, 226, 0.05)';
    }
}

// 新增：处理card-draw的鼠标离开事件
const handleDrawMouseLeave = (e) => {
    isHoveringDraw.value = false
}
</script>

<style scoped lang="scss">
 @use '@/assets/styles/home/_app-card.scss' as *;
</style>