import Vue from 'vue'
import Vuex from "vuex"
import actions from './actions'
import mutations from './mutations'
import user from './modules/user'
import users from './modules/users'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        users,
    },
    actions,
    mutations,
})

export default store