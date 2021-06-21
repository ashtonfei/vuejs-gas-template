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
        let token = localStorage.getItem(key)
        return token == 'null' ? null : token
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
}
