import { TEST_TOKEN, setToken, removeToken } from '@/utils.js'
import router from '@/router'

const state = () => ({
    user: null,
    token: null,
    defaultUser: {
        id: 1,
        name: "Ashton Fei",
        gender: "Male",
        email: "yunjia.fei@gmail.com",
        role: "admin",
        status: "active",
        token: null,
    },
    default_token: 'ashton.fei@gmail.com.password',
})

const getters = {
}

const actions = {
    signin: ({ state, commit }, { email, password }) => {
        try {
            google.script.run
                .withSuccessHandler(response => {
                    const { success, message, data } = JSON.parse(response)
                    if (!success) {
                        alert(message)
                        return
                    }
                    commit('setUser', data)
                })
                .withFailureHandler(err => {
                    alert(err.message)
                })
                .signin(email, password)
        } catch (err) {
            if (`${email}.${password}` !== state.default_token) {
                alert('Your credentials are not current.')
                return
            }
            console.log("You are signed in.")
            const user = { ...state.defaultUser, token: TEST_TOKEN }
            commit('setUser', user)
            router.push('/')
        }
    },
    signout: ({ commit }) => {
        commit('setUser', null)
        router.push('/signin')
    },
}

const mutations = {
    setUser: (state, data) => {
        console.log({ setUserData: data })
        state.user = data
        if (data == null) return removeToken()
        if (data.token) setToken(data.token)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}