import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/Home.vue'
import Category from '@/views/category/Category.vue'
import Suite from '@/views/suite/Suite.vue'
import Community from '@/views/community/Community.vue'
import CommunityPost from '@/views/community/CommunityPost.vue'
import ai from '@/views/ai/ai.vue'
import Detail from '@/views/detail/Detail.vue'
import Layout from '@/views/layout/Layout.vue'
import CommunityIndex from '@/views/community/CommunityIndex.vue'
import CommunityDetail from '@/views/community/CommunityDetail.vue'
import Search from '@/views/search/Search.vue'



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Layout,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    component: Home,
                    meta: { keepScroll: true }
                },
                {
                    path: '/detail',
                    component: Detail,
                    meta: { keepScroll: false }

                },
                {
                    path: '/category',
                    component: Category
                },
                {
                    path: '/suite',
                    component: Suite
                },
                {
                    path: '/ai',
                    component: ai
                },
                {
                    path: '/community',
                    component: Community,
                    children: [
                        {
                            path: '',
                            component: CommunityIndex,
                            redirect: '/community/index'
                        },
                        {
                            name: 'communityIndex',
                            path: 'index',
                            component: CommunityIndex,
                            meta: { keepScroll: true }

                        },
                        {
                            name: 'communityPost',
                            path: 'post',
                            component: CommunityPost
                        },
                        {
                            name: 'communityDetail',
                            path: 'detail/:type',
                            component: CommunityDetail
                        }
                    ]
                },
                {
                    path: '/search',
                    component: Search
                }
            ]
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // 如果有保存的位置且不是返回操作，则使用保存的位置
        if (savedPosition && to.meta.keepScroll) {
            return savedPosition
        }
        // 如果是返回操作且有保存的位置，则使用保存的位置
        if (savedPosition && from.meta.keepScroll) {
            return savedPosition
        }
        // 其他情况滚动到顶部
        return { top: 0 }
    }
})

export default router