import { TEST_USER, getToken, setToken, removeToken } from '@/utils.js'
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
    checkUserAuth: ({ commit, state }) => {
        const token = getToken();
        if (token === null || token === "null") return this.$router.push("/signin");
        try {
            google.script.run
                .withSuccessHandler((response) => {
                    const { success, message, data } = JSON.parse(response);
                    if (!success) return alert(message);
                    this.$store.commit("user/setUser", data);
                })
                .withFailureHandler((err) => {
                    alert(err.message);
                })
                .validateToken(token);
        } catch (err) {
            this.$store.commit("user/setUser", TEST_USER);
        }
    },
    signin: ({ state, commit }, { email, password }) => {
        try {
            google.script.run
                .withSuccessHandler(response => {
                    const { success, message, data } = JSON.parse(response)
                    console.log({ success, message, data })
                    if (!success) {
                        alert(message)
                        return
                    }
                    commit('setUser', data)
                    router.push('/')
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
            commit('setUser', TEST_USER)
            router.push('/')
        }
    },
    signout: ({ commit }) => {
        commit('setUser', null)
        console.log("You are signed out.")
        router.go('/signin')
        // location.reload()
    },
}

const mutations = {
    setUser: (state, data) => {
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