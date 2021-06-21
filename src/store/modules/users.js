import { GOOGLE_NOT_DEFINED, getToken } from '@/utils'

const state = () => ({
    users: [],
    defaultUsers: [
        {
            id: 1,
            name: "Ashton 1",
            gender: "Male",
            email: "yunjia.fei@gmail.com",
            role: "admin",
            status: "active",
        },
        {
            id: 2,
            name: "Ashton 2",
            gender: "Male",
            email: "yunjia.fei@gmail.com",
            role: "staff",
            status: "active",
        },
        {
            id: 3,
            name: "Ashton 3",
            gender: "Female",
            email: "yunjia.fei@gmail.com",
            role: "manager",
            status: "inactive",
        },
    ],
})

const getters = {
    activeUsers: state => state.users.filter(v => v.status.toLowerCase() === 'active'),
    activeUsersCount: (getters) => getters.activeUsers.length,
}

const actions = {
    getAllUsers: ({ commit, state }) => {
        const token = getToken()
        if (token === null || token === "null") return
        try {
            google.script.run
                .withSuccessHandler(response => {
                    const { success, message, data } = JSON.parse(response)
                    if (!success) alert(message)
                    commit('setUsers', data)
                })
                .withFailureHandler(err => {
                    alert(err.message)
                })
                .request("GET", "users", '{}', token)
        } catch (err) {
            commit('setUsers', state.defaultUsers)
        }
    }
}

const mutations = {
    setUsers: (state, data) => state.users = [...data],
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}