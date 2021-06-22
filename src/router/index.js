import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils'

import Home from '@/views/Home'
import Signin from '@/views/Signin'
import Users from '@/views/Users'
import { cat } from 'shelljs'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes: [

        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/signin',
            name: 'signin',
            component: Signin,
            meta: {
                requiresAuth: false,
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

router.beforeEach((to, from, next) => {
    const token = getToken();
    if (token === null) {
        if (to.name !== 'signin') next('/signin')
        else next()
        return
    }
    try {
        google.script.run
            .withSuccessHandler((response) => {
                const { success, message, data } = JSON.parse(response);
                console.log({ success, message, data })
                if (to.name !== 'signin' && !success) next('/signin')
                else next()
            })
            .withFailureHandler((err) => {
                console.log({ error: err.message })
                if (to.name !== 'signin') next('/signin')
                else next()
            })
            .validateToken(token);
    } catch (err) {
        if (to.name !== 'signin' && !token) next('/signin')
        else next()
    }
})
router.afterEach((to, from) => {
    try {
        const stateObject = {}
        const params = {}
        google.script.history.push(stateObject, params, to.name)
    } catch (err) {
        //pass
    }
})
export default router