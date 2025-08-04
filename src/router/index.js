import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/Home.vue'
import Category from '@/views/category/Category.vue'
import Suite from '@/views/suite/Suite.vue'
import Community from '@/views/community/Community.vue'
import CommunityPost from '@/views/community/CommunityPost.vue'
import ai from '@/views/ai/ai.vue'
import Layout from '@/views/layout/Layout.vue'
import CommunityIndex from '@/views/community/CommunityIndex.vue'
import CommunityDetail from '@/views/community/CommunityDetail.vue'



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
                            name:'communityIndex',
                            path: 'index',
                            component: CommunityIndex

                        },
                        {
                            name:'communityPost',
                            path: 'post',
                            component: CommunityPost
                        },
                        {
                            name:'communityDetail',
                            path:'detail/:type',
                            component:CommunityDetail
                        }
                    ]
                }
            ]
        }
    ]
})

export default router