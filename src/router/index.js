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
import User from '@/views/user/User.vue'
import UserDownload from '@/views/user/app/UserDownload.vue'
import UserRecharge from '@/views/user/app/UserRecharge.vue'
import UserAppCollect from '@/views/user/app/UserAppCollect.vue'
import UserSubmit from '@/views/user/app/UserSubmit.vue'
import UserEdit from '@/views/user/account/UserEdit.vue'
import UserDelete from '@/views/user/account/UserDelete.vue'
import UserSecurity from '@/views/user/account/UserSecurity.vue'
import UserFans from '@/views/user/community/UserFans.vue'
import UserFollow from '@/views/user/community/UserFollow.vue'
import UserPost from '@/views/user/community/UserPost.vue'
import UserPostCollect from '@/views/user/community/UserPostCollect.vue'
import Submit from '@/views/submit/Submit.vue'
import RecommendSubmit from '@/views/submit/RecommendSubmit.vue'
import DeveloperSubmit from '@/views/submit/DeveloperSubmit.vue'
import Message from '@/views/message/Message.vue'
import SystemMessage from '@/views/message/SystemMessage.vue'
import CommentReply from '@/views/message/CommentReply.vue'
import LikeCollect from '@/views/message/LikeCollect.vue'
import NewFollower from '@/views/message/NewFollower.vue'
import Signin from '@/views/signin/Signin.vue'




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
                },
                {
                    path: '/user',
                    component: User,
                    children: [
                        {
                            path: '',
                            component: UserDownload,
                            redirect: '/user/dl'
                        },
                        {
                            path: 'dl',
                            component: UserDownload
                        },
                        {
                            path: 'recharge',
                            component: UserRecharge
                        },
                        {
                            path: 'collect/app',
                            component: UserAppCollect
                        },
                        {
                            path: 'submit',
                            component: UserSubmit
                        },
                        {
                            path: 'post',
                            component: UserPost
                        },
                        {
                            path: 'fans',
                            component: UserFans
                        },
                        {
                            path: 'follow',
                            component: UserFollow
                        },
                        {
                            path: 'collect/post',
                            component: UserPostCollect
                        },
                        {
                            path: 'security',
                            component: UserSecurity
                        },
                        {
                            path: 'edit',
                            component: UserEdit
                        },
                        {
                            path: 'delete',
                            component: UserDelete
                        }
                    ]
                },
                {
                    path: '/submit',
                    component: Submit,
                    children: [
                        {
                            path: '',
                            component: RecommendSubmit,
                            redirect: '/submit/recommend'
                        },
                        {
                            path: 'recommend',
                            component: RecommendSubmit
                        },
                        {
                            path: 'developer',
                            component: DeveloperSubmit
                        }
                    ]
                },
                {
                    path: 'message',
                    component: Message,
                    children: [
                        {
                            path: '',
                            component: SystemMessage,
                            redirect: '/message/comment'
                        },
                        {
                            path: 'system',
                            component: SystemMessage
                        },
                        {
                            path: 'like',
                            component: LikeCollect
                        },
                        {
                            path: 'follow',
                            component: NewFollower
                        },
                        {
                            path: 'comment',
                            component: CommentReply
                        }
                    ]
                },
                {
                    path: 'signin',
                    component: Signin
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