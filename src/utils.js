
async function sendRequest(method, tableName, data, sid) {
    let response
    try {
        google.script.run
            .withSuccessHandler(response => {
                console.log(JSON.parse(response))
                response = JSON.parse(response)
            })
            .withFailureHandler(err => {
                console.log(err.message)
                response = { success: false, message: err.message }
            })
            .request(method, tableName, data, sid)
    } catch (err) {
        response = { success: false, message: err.message }
    }
    return response
}

export {
    sendRequest,
}