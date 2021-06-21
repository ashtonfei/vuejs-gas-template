const GOOGLE_NOT_DEFINED = 'google is not defined'
const AUTH_TOKEN_KEY = "gas_jwt_token"
const TEST_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXNodG9uIEZlaSJ9.7TIf2tNTvbGTih25no2_9Q--4zf0lTPIEGxJzNcypXU="
const TEST_USER = {
    id: 'test',
    name: "Ashton Fei",
    role: 'admin',
    email: 'test@gamil.com',
    token: TEST_TOKEN,
}

const getLocalItem = (key) => {
    try {
        return localStorage.getItem(key)
    } catch (err) {
        return null
    }
}

const setLocalItem = (key, value) => {
    try {
        return localStorage.setItem(key, value)
    } catch (err) {
        //pass
    }
}

const removeLocalItem = (key) => {
    try {
        localStorage.removeItem(key)
    } catch (err) {
        //pass
    }
}

const getToken = () => getLocalItem(AUTH_TOKEN_KEY)
const setToken = (token) => setLocalItem(AUTH_TOKEN_KEY, token)
const removeToken = () => removeLocalItem(AUTH_TOKEN_KEY)

const checkUserAuth = async () => {
    const token = getToken()
    if (token == null || token == "null") return { success: false, message: 'No token found in this browser.', data: null }
    try {
        await google.script.run
            .withSuccessHandler(response => {
                return JSON.parse(response)
            })
            .withFailureHandler(err => {
                return { success: false, message: err.message, data: null }
            })
            .validateToken(token)
    } catch (err) {
        return { success: true, message: err.message, data: TEST_USER }
    }
}

const sendRequest = async (method, tableName, data, token) => {
    try {
        await google.script.run
            .withSuccessHandler(response => {
                return JSON.parse(response)
            })
            .withFailureHandler(err => {
                return { success: false, message: err.message, token }
            })
            .request(method, tableName, JSON.stringify(data), token)
    } catch (err) {
        return { success: false, message: err.message, data: null, token }
    }
}

export {
    GOOGLE_NOT_DEFINED,
    AUTH_TOKEN_KEY,
    TEST_USER,
    TEST_TOKEN,
    getLocalItem,
    setLocalItem,
    removeLocalItem,
    getToken,
    setToken,
    removeToken,
    checkUserAuth,
    sendRequest,
}
