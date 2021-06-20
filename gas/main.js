const SETTINGS = {
    APP_NAME: "VueJS GAS Template",
    SSDB_ID: "15zF38SRtW9LjFFrwHYN9-VFROPH6_cn25lqrhlHtxpg",
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
    if (method.toUpperCase() === "GET") return API.get(tableName, data)
    if (method.toUpperCase() === "POST") return API.post(tableName, data)
    if (method.toUpperCase() === "DELETE") return API.delete(tableName, data)
    return JSON.stringify(response)
}

function test(){
  const sid = Session.generateSessionId()
  const data = JSON.stringify({name: "Ashton Fei"})
  const response = request("GET", "users", data, sid)
  console.log(response)
}