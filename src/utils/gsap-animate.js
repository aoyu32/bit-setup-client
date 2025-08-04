import { gsap } from 'gsap'

/**
 * GSAP Vue3 动画指令
 * 使用方法：v-animate="animationConfig"
 */

// 默认配置
const defaultConfig = {
    // 动画类型：fade, slide, scale, rotate, bounce, flip, shake, pulse
    type: 'fade',
    // 触发方式：mounted, hover, click, scroll, manual
    trigger: 'mounted',
    // 动画持续时间（秒）
    duration: 1,
    // 延迟时间（秒）
    delay: 0,
    // 缓动函数
    ease: 'power2.out',
    // 动画方向（适用于slide等）：up, down, left, right
    direction: 'up',
    // 距离（适用于slide等，像素）
    distance: 50,
    // 缩放倍数（适用于scale）
    scale: 0,
    // 旋转角度（适用于rotate）
    rotation: 360,
    // 是否重复
    repeat: 0,
    // 重复间隔
    repeatDelay: 0,
    // 是否来回播放
    yoyo: false,
    // 透明度
    opacity: null,
    // 自定义属性
    custom: {},
    // 滚动触发配置
    scrollTrigger: {
        threshold: 0.1, // 元素可见度阈值
        once: true      // 是否只执行一次
    }
}

// 动画预设
const animations = {
    // 淡入淡出
    fade: {
        from: { opacity: 0 },
        to: { opacity: 1 }
    },

    // 滑动动画
    slide: {
        up: { from: { y: 50, opacity: 0 }, to: { y: 0, opacity: 1 } },
        down: { from: { y: -50, opacity: 0 }, to: { y: 0, opacity: 1 } },
        left: { from: { x: 50, opacity: 0 }, to: { x: 0, opacity: 1 } },
        right: { from: { x: -50, opacity: 0 }, to: { x: 0, opacity: 1 } }
    },

    // 缩放动画
    scale: {
        from: { scale: 0, opacity: 0 },
        to: { scale: 1, opacity: 1 }
    },

    // 旋转动画
    rotate: {
        from: { rotation: -360, opacity: 0 },
        to: { rotation: 0, opacity: 1 }
    },

    // 弹跳动画
    bounce: {
        from: { y: -100, opacity: 0 },
        to: { y: 0, opacity: 1, ease: 'bounce.out' }
    },

    // 翻转动画
    flip: {
        from: { rotationY: -90, opacity: 0 },
        to: { rotationY: 0, opacity: 1 }
    },

    // 抖动动画
    shake: {
        from: { x: 0 },
        to: { x: 0, keyframes: { x: [-10, 10, -10, 10, 0] } }
    },

    // 脉冲动画
    pulse: {
        from: { scale: 1 },
        to: { scale: 1.1, repeat: -1, yoyo: true, ease: 'power2.inOut' }
    },

    // 高度展开动画
    expandHeight: {
        from: { height: 0, opacity: 0 },
        to: { height: 'auto', opacity: 1 }
    },

    // 宽度展开动画
    expandWidth: {
        from: { width: 0, opacity: 0 },
        to: { width: 'auto', opacity: 1 }
    },

    // 同时展开高度和宽度
    expand: {
        from: { height: 0, width: 0, opacity: 0 },
        to: { height: 'auto', width: 'auto', opacity: 1 }
    }
}

// 滚动监听器
class ScrollTrigger {
    constructor() {
        this.elements = new Map()
        this.observer = null
        this.init()
    }

    init() {
        if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const element = entry.target
                    const config = this.elements.get(element)

                    if (entry.isIntersecting && entry.intersectionRatio >= config.threshold) {
                        this.triggerAnimation(element, config)

                        if (config.once) {
                            this.observer.unobserve(element)
                            this.elements.delete(element)
                        }
                    }
                })
            })
        }
    }

    add(element, config) {
        if (this.observer) {
            this.elements.set(element, config)
            this.observer.observe(element)
        }
    }

    remove(element) {
        if (this.observer && this.elements.has(element)) {
            this.observer.unobserve(element)
            this.elements.delete(element)
        }
    }

    triggerAnimation(element, config) {
        const directive = element.__vAnimate__
        if (directive) {
            directive.play()
        }
    }
}

const scrollTrigger = new ScrollTrigger()

// 动画控制器
class AnimationController {
    constructor(element, config) {
        this.element = element
        this.config = { ...defaultConfig, ...config }
        this.timeline = null
        this.isPlaying = false
        this.init()
    }

    init() {
        this.setupAnimation()
        this.bindEvents()

        // 根据触发方式执行动画
        switch (this.config.trigger) {
            case 'mounted':
                this.play()
                break
            case 'scroll':
                scrollTrigger.add(this.element, {
                    ...this.config.scrollTrigger,
                    controller: this
                })
                break
        }
    }

    setupAnimation() {
        const { type, direction, distance, scale, rotation, duration, delay, ease, repeat, repeatDelay, yoyo, opacity, custom } = this.config

        let fromProps = {}
        let toProps = {}

        // 处理高度展开动画的特殊逻辑
        if (type === 'expandHeight' || type === 'expandWidth' || type === 'expand') {
            this.setupExpandAnimation()
            return
        }

        // 根据动画类型设置属性
        if (animations[type]) {
            if (type === 'slide' && animations[type][direction]) {
                fromProps = { ...animations[type][direction].from }
                toProps = { ...animations[type][direction].to }

                // 自定义距离
                if (distance !== 50) {
                    if (direction === 'up') fromProps.y = distance
                    else if (direction === 'down') fromProps.y = -distance
                    else if (direction === 'left') fromProps.x = distance
                    else if (direction === 'right') fromProps.x = -distance
                }
            } else {
                fromProps = { ...animations[type].from }
                toProps = { ...animations[type].to }

                // 自定义缩放
                if (type === 'scale' && scale !== 0) {
                    fromProps.scale = scale
                }

                // 自定义旋转
                if (type === 'rotate' && rotation !== 360) {
                    fromProps.rotation = -rotation
                }
            }
        }

        // 自定义透明度
        if (opacity !== null) {
            fromProps.opacity = opacity
            toProps.opacity = 1
        }

        // 合并自定义属性
        fromProps = { ...fromProps, ...custom.from }
        toProps = { ...toProps, ...custom.to }

        // 设置初始状态
        gsap.set(this.element, fromProps)

        // 创建时间轴
        this.timeline = gsap.timeline({
            paused: true,
            repeat,
            repeatDelay,
            yoyo
        })

        this.timeline.to(this.element, {
            ...toProps,
            duration,
            delay,
            ease: toProps.ease || ease
        })
    }

    setupExpandAnimation() {
        const { type, duration, delay, ease, repeat, repeatDelay, yoyo, opacity, custom } = this.config

        // 保存原始样式
        const originalHeight = this.element.offsetHeight
        const originalWidth = this.element.offsetWidth
        const originalOpacity = window.getComputedStyle(this.element).opacity

        let fromProps = {}
        let toProps = {}

        // 根据展开类型设置属性
        if (type === 'expandHeight') {
            fromProps = { height: 0, overflow: 'hidden' }
            toProps = { height: originalHeight, overflow: 'visible' }
        } else if (type === 'expandWidth') {
            fromProps = { width: 0, overflow: 'hidden' }
            toProps = { width: originalWidth, overflow: 'visible' }
        } else if (type === 'expand') {
            fromProps = { height: 0, width: 0, overflow: 'hidden' }
            toProps = { height: originalHeight, width: originalWidth, overflow: 'visible' }
        }

        // 添加透明度
        if (opacity !== null) {
            fromProps.opacity = opacity
            toProps.opacity = originalOpacity
        } else {
            fromProps.opacity = 0
            toProps.opacity = originalOpacity
        }

        // 合并自定义属性
        fromProps = { ...fromProps, ...custom.from }
        toProps = { ...toProps, ...custom.to }

        // 设置初始状态
        gsap.set(this.element, fromProps)

        // 创建时间轴
        this.timeline = gsap.timeline({
            paused: true,
            repeat,
            repeatDelay,
            yoyo
        })

        this.timeline.to(this.element, {
            ...toProps,
            duration,
            delay,
            ease
        })
    }

    bindEvents() {
        const { trigger } = this.config

        if (trigger === 'hover') {
            this.element.addEventListener('mouseenter', () => this.play())
            this.element.addEventListener('mouseleave', () => this.reverse())
        } else if (trigger === 'click') {
            this.element.addEventListener('click', () => this.toggle())
        }
    }

    play() {
        if (this.timeline && !this.isPlaying) {
            this.timeline.play()
            this.isPlaying = true
        }
    }

    pause() {
        if (this.timeline) {
            this.timeline.pause()
        }
    }

    reverse() {
        if (this.timeline) {
            this.timeline.reverse()
            this.isPlaying = false
        }
    }

    restart() {
        if (this.timeline) {
            this.timeline.restart()
            this.isPlaying = true
        }
    }

    toggle() {
        if (this.timeline) {
            if (this.timeline.progress() === 1) {
                this.reverse()
            } else {
                this.play()
            }
        }
    }

    destroy() {
        if (this.timeline) {
            this.timeline.kill()
        }
        scrollTrigger.remove(this.element)
    }

    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig }
        this.destroy()
        this.init()
    }
}

// Vue3 指令定义
export const vAnimate = {
    mounted(el, binding) {
        const config = binding.value || {}
        const controller = new AnimationController(el, config)

        // 将控制器实例存储到元素上，方便后续操作
        el.__vAnimate__ = controller
    },

    updated(el, binding) {
        if (el.__vAnimate__ && binding.value !== binding.oldValue) {
            el.__vAnimate__.updateConfig(binding.value || {})
        }
    },

    unmounted(el) {
        if (el.__vAnimate__) {
            el.__vAnimate__.destroy()
            delete el.__vAnimate__
        }
    }
}

// 全局注册指令的函数
export function registerAnimateDirective(app) {
    app.directive('gsap', vAnimate)
}

// 导出默认配置和动画预设，方便自定义
export { defaultConfig, animations }