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

/**
 * 
 * @returns get auth token from local storage
 */
const getToken = () => getLocalItem(AUTH_TOKEN_KEY)
/**
 * 
 * @param {string} token the token provided by the server side
 */
const setToken = (token) => setLocalItem(AUTH_TOKEN_KEY, token)
const removeToken = () => removeLocalItem(AUTH_TOKEN_KEY)


/**
 * 
 * @param {string} functionName the function name google.script.run.{functionName} which is created in your apps script project
 * @param {object} params an object of parameters
 */
const runApi = (functionName, params) => {
    if (typeof params === 'object') params = JSON.stringify(params)
    return new Promise((resolve, reject) => {
        google.script.run
            .withSuccessHandler(reply => resolve(JSON.parse(reply)))
            .withFailureHandler(err => reject({ success: false, message: err.message }))[functionName](params)
    })
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
    runApi
}
