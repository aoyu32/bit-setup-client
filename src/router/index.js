import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/home/Index.vue'
import Category from '@/views/category/Category.vue'
import Suite from '@/views/suite/Suite.vue'
import Community from '@/views/community/Community.vue'
import Assistant from '@/views/assistant/Assistant.vue'
import Layout from '@/views/layout/Layout.vue'



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Layout,
            redirect: '/index',
            children: [
                {
                    path: '/index',
                    component: Index,
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
                    path: '/assistant',
                    component: Assistant
                },
                {
                    path: '/community',
                    component: Community
                }
            ]
        }
    ]
})

export default router