<template>
    <div class="app-card" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <div class="card-draw">
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
                <span>推荐</span>
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
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['app'])

onMounted(() => {
})


const handleMouseMove = (e) => {
    //获取事件元素
    const card = e.currentTarget
    console.log(e);
    //获取元素几何
    const cardRect = card.getBoundingClientRect()
    //计算鼠标相对于元的位置
    const relativeX = e.clientX - cardRect.left
    const relativeY = e.clientY - cardRect.top

    //计算翻转按钮的位置
    const drawButtonX = relativeX - 35
    const drawButtonY = relativeY - 35
    console.log("按钮范围：",drawButtonX,drawButtonY);

    if(relativeX <= drawButtonX && relativeY <= drawButtonY){
        return
    }
    
    

    //计算中心距离
    const centerX = cardRect.width / 2
    const centerY = cardRect.height / 2

    //计算旋转距离
    const rotateX = -(centerX - relativeX)
    const rotateY = centerY - relativeY

    //旋转比例
    const routeRate = 5
    //缩放距离
    const scaleSize = 50
    //景深
    const perspectiveSize = 900
    //阴影模糊半径
    const shadowSize = 30
    //阴影颜色
    const shadowColor = `rgba(0,0,0,0.15)`

    card.style.transform = `perspective(${perspectiveSize}px) rotateX(${rotateY / routeRate}deg) rotateY(${rotateX / routeRate}deg) translateZ(${scaleSize}px)`
    // card.style.boxShadow = `${rotateX/routeRate}px ${rotateY/routeRate}px ${shadowSize}px ${shadowColor}, 0 20px 40px rgba(74, 145, 226, 0.1)`
    card.style.boxShadow = `
        ${(relativeX - centerX) / 4}px 
        ${(relativeY - centerY) / 4}px 
        ${shadowSize}px ${shadowColor},
        0 20px 40px rgba(74, 145, 226, 0.1)
    `;

}

const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
}

</script>

<style scoped lang="scss">
.app-card {
    height: 270px;
    background-color: #f8f9fa;
    @include flex-fcc;
    border-radius: 10px;
    position: relative;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    user-select: none;

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
            z-index: 99;
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
    }

    .card-draw {
        width: 30px;
        height: 30px;
        position: absolute;
        z-index: 99;
        right: 5px;
        top: 5px;
        @include flex-c;
        border-radius: 10px;

        button {
            @include wh-100;
            color: $color-light;
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
</style>