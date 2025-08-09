<template>
    <div class="ai-sidebar" ref="aiSidebarRef" :style="{ width: sidebarWidth }">
        <div class="ai-sidebar-wrapper" v-if="isFoldSidebar">
            <div class="sidebar-header">
                <div class="ai-name">
                    <div class="ai-logo">
                        <i class="iconfont icon-shejizhinengzhushou"></i>
                    </div>
                    <span>BIT BOOT</span>
                </div>
                <div class="fold-sidebar" @click="handleFoldButton">
                    <span><i class="iconfont icon-menu-fold"></i></span>
                </div>
            </div>
            <div class="new-chat">
                <button @click="handleNewChat">
                    <i class="iconfont icon-plus"></i>
                    新对话
                </button>
            </div>
            <div class="history-chat">
                <div class="history-label">
                    <span><i class="iconfont icon-time-rewind"></i>历史对话</span>
                </div>
                <div class="history-list" @scroll="handleHistoryListScroll($event)">
                    <div class="history-item" v-for="(item, index) in chatHistoryData" :key="index">
                        <div class="item-content">
                            <input type="text">
                            <span>{{ item }}</span>
                        </div>
                        <div class="item-more" @click="handleMore(index, $event)">
                            <span><i class="iconfont icon-ellipsis"></i></span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="fold-nav" v-else>
            <div class="ai-logo">
                <i class="iconfont icon-shejizhinengzhushou"></i>
            </div>
            <div class="unfold-btn" @click="handleFoldButton">
                <span><i class="iconfont icon-menu-unfold"></i></span>
            </div>
            <div class="new-chat">
                <i class="iconfont icon-xinjianduihua"></i>
            </div>
        </div>
        <div class="more-menu" ref="moreMenuRef" v-show="showMoreMenu">
            <div class="menu-item" @click="handleMoreMenuItem('rename')">
                <i class="iconfont icon-dengji"></i>
                <span>重命名</span>
            </div>
            <div class="menu-item" @click="handleMoreMenuItem('delete')">
                <i class="iconfont icon-shanchu"></i>
                <span>删除</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import chatHistoryData from '@/utils/chat-history.js'
const isFoldSidebar = ref(true)
const aiSidebarRef = ref(null)
const sidebarWidth = computed(() => { return isFoldSidebar.value ? '250px' : '70px' })
const emit = defineEmits(['fold-sidebar','new-chat'])
const moreMenuRef = ref(null)
const showMoreMenu = ref(false)
const showRenameInput = ref(false)
const currentItemIndex = ref(0)

//创建新对话
const handleNewChat = () => {
    emit('new-chat')
}

//折叠侧边栏按钮点事件
const handleFoldButton = () => {
    isFoldSidebar.value = !isFoldSidebar.value
    emit('fold-sidebar', isFoldSidebar.value)
}

const handleMore = (index, event) => {
    event.stopPropagation()
    const historyItems = document.querySelectorAll('.history-item')
    const aiSidebar = aiSidebarRef.value
    currentItemIndex.value = index
    console.log(historyItems);

    historyItems.forEach((el, elIndex) => {
        if (index === elIndex) {
            console.log(elIndex);
            
            // 获取点击项的位置和尺寸
            const itemRect = el.getBoundingClientRect()
            const sidebarRect = aiSidebar.getBoundingClientRect()
            // 计算相对于侧边栏容器的位置
            const relativeTop = itemRect.top - sidebarRect.top
            console.log(el);
            console.log(aiSidebar);
            
            
            console.log(itemRect.top);
            console.log(sidebarRect.top);
            
            // 设置菜单位置
            console.log(relativeTop);
            
            moreMenuRef.value.style.top = `${relativeTop}px`
            showMoreMenu.value = true
        }
    })
}

// 点击外部关闭菜单
const handleClickOutside = (event) => {
    // 检查点击的元素是否在菜单内部
    if (moreMenuRef.value && !moreMenuRef.value.contains(event.target)) {
        showMoreMenu.value = false
    }
}

//监听重命名和删除历史对话
const handleMoreMenuItem = (type) => {
    const historyItems = document.querySelectorAll('.history-item')
    let input = null
    let span = null
    let more = null
    let spanValue
    historyItems.forEach((el, index) => {

        if (currentItemIndex.value === index) {
            showMoreMenu.value = false
            input = el.querySelector('input')
            span = el.querySelector('span')

            spanValue = span.textContent
            console.log(spanValue);
            console.log(spanValue);
            more = el.querySelector('.item-more')
        }
    })
    if (type === 'rename') {
        input.style.display = 'block'
        span.style.display = 'none'
        more.style.display = 'none'
        input.focus()
        input.value = spanValue
        input.addEventListener('blur', () => {
            input.style.display = 'none'
            span.style.display = 'block'
            span.textContent = input.value
            more.style.display = 'block'
        })
    }

}
let scrollTimeout = null
//监听滚动事件
const handleHistoryListScroll = (event) => {
    const target = event.target

    // 清除之前的定时器
    if (scrollTimeout) {
        clearTimeout(scrollTimeout)
    }

    // 显示滚动条
    target.classList.add('show-scrollbar')

    // 设置定时器，停止滚动后隐藏滚动条
    scrollTimeout = setTimeout(() => {
        target.classList.remove('show-scrollbar')
    }, 300) // 停止滚动1秒后隐藏
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})

</script>
<style lang="scss" scoped>
@use '@/assets/styles/ai/_ai-sidebar.scss' as *;
</style>