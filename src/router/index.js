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
import Feedback from '@/views/feedback/Feedback.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Resest from '@/views/auth/Resest.vue'
import Vip from '@/views/vip/Vip.vue'
import Recharge from '@/views/recharge/Recharge.vue'



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: Layout,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: Home,
                    meta: { keepScroll: true }
                },
                {
                    path: '/detail/:id',
                    name: 'detail',
                    component: Detail,
                    meta: { keepScroll: false }
                },
                {
                    path: '/category',
                    name: 'category',
                    component: Category
                },
                {
                    path: '/suite',
                    name: 'suite',
                    component: Suite
                },
                {
                    path: '/ai/chat',
                    name: 'aiChat',
                    component: ai
                },
                {
                    path: '/ai/chat/:id',
                    name: 'aiChatWithId',
                    component: ai
                },
                {
                    path: '/community',
                    name: 'community',
                    component: Community,
                    children: [
                        {
                            path: '',
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
                    name: 'search',
                    component: Search
                },
                {
                    path: '/user',
                    name: 'user',
                    component: User,
                    children: [
                        {
                            path: '',
                            redirect: '/user/dl'
                        },
                        {
                            path: 'dl',
                            name: 'userDownload',
                            component: UserDownload
                        },
                        {
                            path: 'recharge',
                            name: 'userRecharge',
                            component: UserRecharge
                        },
                        {
                            path: 'collect/app',
                            name: 'userAppCollect',
                            component: UserAppCollect
                        },
                        {
                            path: 'submit',
                            name: 'userSubmit',
                            component: UserSubmit
                        },
                        {
                            path: 'post',
                            name: 'userPost',
                            component: UserPost
                        },
                        {
                            path: 'fans',
                            name: 'userFans',
                            component: UserFans
                        },
                        {
                            path: 'follow',
                            name: 'userFollow',
                            component: UserFollow
                        },
                        {
                            path: 'collect/post',
                            name: 'userPostCollect',
                            component: UserPostCollect
                        },
                        {
                            path: 'security',
                            name: 'userSecurity',
                            component: UserSecurity
                        },
                        {
                            path: 'edit',
                            name: 'userEdit',
                            component: UserEdit
                        },
                        {
                            path: 'delete',
                            name: 'userDelete',
                            component: UserDelete
                        }
                    ]
                },
                {
                    path: '/submit',
                    name: 'submit',
                    component: Submit,
                    children: [
                        {
                            path: '',
                            redirect: '/submit/recommend'
                        },
                        {
                            path: 'recommend',
                            name: 'submitRecommend',
                            component: RecommendSubmit
                        },
                        {
                            path: 'developer',
                            name: 'submitDeveloper',
                            component: DeveloperSubmit
                        }
                    ]
                },
                {
                    path: 'message',
                    name: 'message',
                    component: Message,
                    children: [
                        {
                            path: '',
                            redirect: '/message/comment'
                        },
                        {
                            path: 'system',
                            name: 'messageSystem',
                            component: SystemMessage
                        },
                        {
                            path: 'like',
                            name: 'messageLike',
                            component: LikeCollect
                        },
                        {
                            path: 'follow',
                            name: 'messageFollow',
                            component: NewFollower
                        },
                        {
                            path: 'comment',
                            name: 'messageComment',
                            component: CommentReply
                        }
                    ]
                },
                {
                    path: '/signin',
                    name: 'signin',
                    component: Signin
                },
                {
                    path: '/feedback',
                    name: 'feedback',
                    component: Feedback
                },
                {
                    path: '/vip',
                    name: 'vip',
                    component: Vip
                },
                {
                    path: '/recharge',
                    name: 'recharge',
                    component: Recharge
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/reset',
            name: 'reset',
            component: Resest
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
