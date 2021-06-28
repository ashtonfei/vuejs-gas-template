const SETTINGS = {
    ROOT_URL: "https://script.google.com/macros/s/AKfycbzJX6xTOZSu_hIywmZ1_LBxouEAgUUOuNnI9DH3KV1l/dev",
    SECRECT: "asdflkja;lskjdfi12;lkjafjslkdf",
    APP_NAME: "VueJS GAS Template",
    SSDB_ID: "15zF38SRtW9LjFFrwHYN9-VFROPH6_cn25lqrhlHtxpg",
    AUTH_TABLE_NAME: 'users',
    SESSION_EXPRATION_IN_SECONDS: 6 * 60 * 60, // Max 6 hours, min 1s
}

function include(filename) {
    return HtmlService.createTemplateFromFile(filename).evaluate().getContent()
}

function getUrl() {
    return ScriptApp.getService().getUrl()
}

function doGet(e) {
    const htmlOuput = HtmlService.createTemplateFromFile("index.html").evaluate()
    htmlOuput.setTitle(SETTINGS.APP_NAME)
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag("viewport", "width=device-width,initial-scale=1")
    return htmlOuput
}

const request = (method, tableName, stringify_json, token) => {
    let response = { success: true, message: "Your request has been done successfully.", token }
    if (!JWT.isValidToken(token)) return { success: false, message: "Your session is not valid anymore, please sign in again!", token: null }
    const data = JSON.parse(stringify_json)
    if (method.toUpperCase() === "GET") response = API.get(tableName, data)
    if (method.toUpperCase() === "POST") response = API.post(tableName, data)
    if (method.toUpperCase() === "DELETE") response = API.delete(tableName, data)
    return JSON.stringify({ ...response, token })
}

const validateToken = (token) => JSON.stringify(Auth.validateToken(token))

const signout = (token) => JSON.stringify(Auth.signout(token))

const signin = (data) => {
    const { email, password } = JSON.parse(data)
    return JSON.stringify(Auth.singin(email, password))
}

const createHashPassword = () => {
    const password = '123456'
    console.log(Auth.hashPassword(password))
}

const test = () => {
    const users = API.get(SETTINGS.AUTH_TABLE_NAME, { role: 'admin' })
    console.log(users)
}

