import Vue from 'vue'
import Router from 'vue-router'
import { checkUserAuth } from '@/utils.js'

import Home from '@/views/Home'
import Signin from '@/views/Signin'
import Users from '@/views/Users'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/signin',
            name: 'signin',
            component: Signin,
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/users',
            name: 'users',
            component: Users,
            meta: {
                requiresAuth: true,
            },
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const result = await checkUserAuth()
    if (!result.success && to.name !== "signin") {
        next("/signin")
    } else {
        next()
    }
})

export default router