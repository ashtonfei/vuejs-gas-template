import { GOOGLE_NOT_DEFINED, TEST_TOKEN, sendRequest } from '@/utils'

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
    activeUsersCount: (state, getters) => getters.activeUsers.length,
}

const actions = {
    getAllUsers: async ({ commit, state }) => {
        const token = ""
        const result = await sendRequest('GET', 'users', {}, TEST_TOKEN)
        if (result.success) {
            commit('setUsers', result.data)
        } else {
            if (result.message === GOOGLE_NOT_DEFINED) {
                commit('setUsers', state.defaultUsers)
            } else {
                alert(result.message)
            }
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