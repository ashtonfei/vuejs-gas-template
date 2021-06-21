class JWT {
    constructor() { }
    /**
     * @param {object} payload - an json object
     */
    static createToken(payload) {
        const header = Utilities.base64EncodeWebSafe(JSON.stringify({ alg: "HS256", typ: "JWT" }))
        payload = Utilities.base64EncodeWebSafe(JSON.stringify(payload))
        const signature = Utilities.computeHmacSha256Signature(`${header}.${payload}`, SETTINGS.SECRECT)
        return `${header}.${payload}.${Utilities.base64EncodeWebSafe(signature)}`
    }

    /**
     * @param {string} token - header.payload.signature
     */
    static isValidToken(token) {
        const [header, payload, signature] = token.split(".")
        const validSignature = Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(`${header}.${payload}`, SETTINGS.SECRECT))
        return signature === validSignature
    }
}

class Session {
    constructor() {
    }

    static generateSessionId() {
        return Utilities.base64Encode(Utilities.getUuid())
    }

    static getSession(sid) {
        const session = CacheService.getScriptCache().get(sid)
        if (session === null) return session
        return this.createSession(sid, session)
    }

    static createSession(key, session) {
        CacheService.getScriptCache().put(key, session, SETTINGS.SESSION_EXPRATION_IN_SECONDS)
        return session
    }

    static deleteSession(sid) {
        CacheService.getScriptCache().remove(sid)
    }
}


class SSDB {
    constructor(id = SETTINGS.SSDB_ID) {
    }
    /**
     * @param {} table - the name of the table(tab) in the database(spreadsheet)
     */

    static getAllData(table) {
        let [keys, ...values] = table.getDataRange().getValues()
        keys = keys.map(v => v.toString().trim())
        return values.map(v => {
            const item = {}
            keys.forEach((key, i) => {
                if (key) item[key] = v[i]
            })
            return item
        })
    }
}

class API extends SSDB {
    constructor() {
    }
    /**
     * @param {string} name - name of the table(tab) in the database(spreadsheet)
     */
    static getTableByName(name) {
        let db
        const response = { success: true, message: `${name} is found in the database.`, table: null }
        try {
            db = SpreadsheetApp.openById(SETTINGS.SSDB_ID)
        } catch (e) {
            response.success = false
            response.message = `${e.message}`
            return response
        }
        const table = db.getSheetByName(name)
        if (!table) {
            response.success = false
            response.message = `${name} was not found in database.`
        } else {
            response.table = table
        }
        return response
    }

    /**
     * @param {string} tableName - name of the table(tab) in the database(spreadsheet)
     * @param {object} data - filters object {key: value}
     */
    static get(tableName, data) {
        const { success, message, table } = this.getTableByName(tableName)
        if (!table) return { success, message }
        return {
            success,
            message: "Items have been retrieved from the database.",
            data: SSDB.getAllData(table)
        }
    }

    /**
     * @param {string} tableName - name of the table(tab) in the database(spreadsheet)
     * @param {object|array} data - object for single item and array of object for mutiple items 
     */
    static post(tableName, data) {
        const { success, message, table } = this.getTableByName(tableName)
        if (!table) return { success, message }
        return {
            success,
            message: "Items have been posted from the database.",
            data: table.getDataRange().getValues()
        }
    }

    /**
     * @param {string} tableName - name of the table(tab) in the database(spreadsheet)
     * @param {object} data - item id object {id: id_value}
     */
    static delete(tableName, data) {
        const { success, message, table } = this.getTableByName(tableName)
        if (!table) return { success, message }
        return {
            success,
            message: "Items have been deleted from the database.",
            data: table.getDataRange().getValues()
        }
    }
}

class Auth {
    constructor() {

    }

    static validateToken(token) {
        return JWT.isValidToken(token) ? {
            success: true,
            message: "Token is valid.",
            data: JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(token.split(".")[1])).getDataAsString()),
            token,
        } : {
            success: false,
            message: "Token is invalid.",
            data: null,
            token: null,
        }
    }

    static singin(email, password) {
        if (`${email}.${password}` === 'yunjia.fei@gmail.com.password') {
            const user = {
                id: 'gas-test',
                name: 'Ashton Fei',
                email: 'yunjia.fei@gmail.com',
                role: 'admin',
                status: 'active',
            }
            user.token = JWT.createToken(user)
            return { success: true, message: 'You are signed in successfully.', data: user }
        }
        return { success: false, message: 'Your credentials are not correct.', data: null }
    }

    static signout(token) {

    }
}