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
.app-card {
    height: 270px;
    background-color: #f8f9fa;
    border-radius: 10px;
    position: relative;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    user-select: none;


    .card-content {
        width: 100%;
        height: 100%;
        @include flex-fcc;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        border-radius: 10px;
        transform-style: preserve-3d;
        overflow: hidden;


        .card-draw {
            width: 45px;
            height: 45px;
            position: absolute;
            z-index: 99;
            display: flex;
            align-items: start;
            justify-content: end;
            border-radius: 10px;
            transition: all 0.3s ease-in-out;

            button {
                @include wh-100;
                width: 30px;
                height: 30px;
                border-radius: 10px;
                color: $color-light;
                cursor: pointer;
                margin: 5px;

                &:hover {
                    transform: scale(1.1);
                    background-color: #dde0e34b;
                }
            }
        }

    }

    #card-content-front {


        &:hover {
            .app-img {
                transform: perspective(1000px) translateZ(30px) scale(1.05);
            }

            .app-name {
                transform: perspective(1000px) translateZ(30px);
            }

            .app-category {
                transform: perspective(1000px) translateZ(30px);
            }

            .app-download {
                transform: perspective(1000px) translateZ(10px);
            }
        }

        .is-flipped {

            .app-img,
            .app-name,
            .app-category,
            .app-download,
            .app-mark,
            .iconfont {
                transition: transform 0.3s cubic-bezier(0.23, 1, 0.320, 1);
            }
        }

        .card-top {
            @include wh-100;
            flex: 1;
            @include flex-c;
            position: relative;
            background: hsl(212, 79%, 69%);
            border-top-left-radius: 10px; // 顶部左侧圆角                  
            border-top-right-radius: 10px; // 顶部右侧圆角                     


            .app-img {
                width: 50px;
                height: 50px;
                z-index: 99;
                transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);

                img {
                    @include wh-100;
                    object-fit: contain;
                }
            }

            &::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 70px;
                background-color: #f8f9fa;
            }

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 70px;
                background: hsl(212, 79%, 69%);
                border-bottom-left-radius: 100px;
            }
        }

        .card-bottom {
            @include wh-100;
            flex: 1;
            display: flex;
            align-items: center;
            flex-direction: column;
            position: relative;
            background: #f8f9fa;
            gap: 10px;
            border-bottom-left-radius: 10px; // 底部左侧圆角                  
            border-bottom-right-radius: 10px; // 底部右侧圆角                    

            .app-name {
                z-index: 99;
                font-size: 17px;
                font-weight: 550;
                padding-top: 20px;
                color: #2c3e50;
                transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
            }

            .app-category {
                z-index: 89;
                padding: 5px;
                font-size: 14px;
                border-radius: $border-radius;
                background-color: #e3f2fd;
                color: #1976d2;
                transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
            }

            .app-download {
                font-size: 12px;
                color: #6c757d;
                z-index: 99;
                transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);

                span {
                    @include flex-fcc;
                }

                .iconfont {
                    font-size: 13px;
                }
            }

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 70px;
                background: hsl(212, 79%, 69%);
            }

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 70px;
                background-color: #f8f9fa;
                border-top-right-radius: 70px;
            }
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 100%;
            z-index: 90;
            background: rgba(74, 145, 226, 0.185);
            border-bottom-left-radius: 10px; // 底部左侧圆角              
            border-top-left-radius: 10px; // 顶部左侧圆角    
        }

        .card-draw {
            right: 0px;
            top: 0px;

            button {
                transform: translateY(-180deg);
            }

        }

        .mark-wrapper {
            font-size: 9px;
            color: color.scale($color-light, $lightness: 50%);
            @include flex-fcc;
            z-index: 99;
            gap: 10px;
            position: absolute;

            .app-mark {
                background-color: #ffffff2a;
                padding: 2px;
            }
        }

        .left-mark {
            align-items: start;
            top: 10px;
            left: 0;
        }

        .right-mark {
            align-items: end;
            top: 50px;
            right: 0;
        }
    }

    #card-content-back {
        position: relative;

        .card-draw {
            left: 0;
            z-index: 100;
            top: 0;
        }

        .app-rating {
            position: absolute;
            width: 40px;
            top: 10px;
            right: 0px;
            z-index: 99;
            transform: scaleX(-1);
            @include flex-c;
            font-size: 12px;
            padding: 2px 0;
            color: $color-light;
            background: #ff728e52;
                gap: 3px;
            span{
                @include flex-c;
                .iconfont{
                    font-size: 14px
                }
            }

            
        }

        .card-top {
            @include wh-100;
            flex: 1;
            @include flex-c;
            position: relative;
            background: hsl(212, 79%, 69%);
            border-top-left-radius: 10px; // 顶部左侧圆角                  
            border-top-right-radius: 10px; // 顶部右侧圆角                     

            .app-bio {
                @include wh-100;
                @include flex-fcc;
                z-index: 99;
                padding: 20px 20px;
                font-size: 14px;
                text-align: center;
                transform: scaleX(-1);
                color: color.scale($color-light, $lightness: 10%);
            }





            &::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 70px;
                background-color: #f8f9fa;
            }

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 70px;
                background: hsl(212, 79%, 69%);
            }
        }

        .card-bottom {
            @include wh-100;
            flex: 1;
            display: flex;
            align-items: center;
            flex-direction: column;
            position: relative;
            background: #f8f9fa;
            gap: 10px;
            border-bottom-left-radius: 10px; // 底部左侧圆角                  
            border-bottom-right-radius: 10px; // 底部右侧圆角               

            .card-logo {
                @include wh-100;
                z-index: 99;
                @include flex-c;
                transform: scaleX(-1);
            }


            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 70px;
                background: hsl(212, 79%, 69%);
            }

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 70px;
                background-color: #f8f9fa;
                border-top-right-radius: 70px;
                border-top-left-radius: 70px;
            }
        }
    }

}
</style>