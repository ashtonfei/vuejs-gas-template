const SETTINGS = {
    APP_NAME: "VueJS GAS Template",
    SSDB_ID: "15zF38SRtW9LjFFrwHYN9-VFROPH6_cn25lqrhlHtxpg",
    SESSION_EXPRATION_IN_SECONDS: 6 * 60 * 60, // Max 6 hours, min 1s
}

function include(filename) {
    return HtmlService.createTemplateFromFile(filename).evaluate().getContent()
}

function doGet(e) {
    const htmlOuput = HtmlService.createTemplateFromFile("index.html").evaluate()
    htmlOuput.setTitle(SETTINGS.APP_NAME)
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag("viewport", "width=device-width,initial-scale=1")
    return htmlOuput
}

function request(method, tableName, stringify_json, sid) {
    let response = { success: true, message: "Your request has been done successfully.", sid }
    const session = Session.getSession(sid)
    if (!session) return { success: false, message: "Your session is not valid anymore, please sign in again!", sid: null }

    const data = JSON.parse(stringify_json)
    if (method.toUpperCase() === "GET") response = API.get(tableName, data)
    if (method.toUpperCase() === "POST") response = API.post(tableName, data)
    if (method.toUpperCase() === "DELETE") response = API.delete(tableName, data)
    return JSON.stringify({ ...response, sid })
}

function test() {
    const sid = "ZjAxYmE1MWEtZjc2YS00ZTc1LWE0ZjctYWYxNzgxMTNkNDYy"
    console.log(sid)
    const data = JSON.stringify({ name: "Ashton Fei" })
    const session = Session.createSession(sid, data)
    console.log(session)

    const response = request("DELETE", "users", data, sid)
    console.log(response)
}