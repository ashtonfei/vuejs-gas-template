import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Signin from '@/views/Signin'
import Users from '@/views/Users'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/signin',
            name: 'Sign in',
            component: Signin
        },
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/users',
            name: 'Users',
            component: Users
        }
    ]
})
