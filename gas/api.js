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
    constructor() { }
    /**
     * @description get all items from a table
     * @param {sheet} table worksheet object
     * e.g. SpreadsheetApp.getActive().getSheetByName()
     * @returns an array of objects
     */
    static getAllItems(table) {
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

    /**
     * @description get the first match item by filters from a table
     * @param {sheet} table worksheet object
     * e.g. SpreadsheetApp.getActive().getSheetByName()
     * 
     * @param {object} filters an object of key:value pairs
     * default is null (get all data without any filters)
     * e.g. {name: "Ashton Fei", role: ["admin", "staff"]}
     * note: value can be an array for multiple values in one column
     * 
     * @returns a single item found or undefined
     */
    static getItemByFilters(table, filters) {
        const items = this.getAllItems(table)
        return items.find(item => {
            const results = Object.keys(filters).map(key => {
              const itemValue = item[key]
              const filterValue = filters[key]
              if (Array.isArray(filterValue)) return filterValue.includes(itemValue)
              return itemValue === filterValue
            })
            return !results.includes(false)
        })
    }

    /**
     * @description get items by filters from a table
     * @param {sheet} table worksheet object
     * e.g. SpreadsheetApp.getActive().getSheetByName()
     * 
     * @param {object} filters an object of key:value pairs
     * default is null (get all data without any filters)
     * e.g. {name: "Ashton Fei", role: ["admin", "staff"]}
     * note: value can be an array for multiple values in one column
     * 
     * @returns an array of items found or empty array
     */
    static getItemsByFilters(table, filters) {
        const items = this.getAllItems(table)
        return items.filter(item => {
            const results = Object.keys(filters).map(key => {
              const itemValue = item[key]
              const filterValue = filters[key]
              if (Array.isArray(filterValue)) return filterValue.includes(itemValue)
              return itemValue === filterValue
            })
            return !results.includes(false)
        })
    }
}

class API {
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
     * @param {string} tableName the name of table(tab) in the database(spreadsheet)
     * e.g. users
     * @param {object} filters an object of key:value pairs
     * default is null (get all data without any filters)
     * e.g. {name: "Ashton Fei", role: ["admin", "staff"]}
     * note: value can be an array for multiple values in one column
     * @returns an array of objects or empty array
     */
    static get(tableName, filters = null) {
        const response = {
            success: true,
            message: "Items have been retrieved from the database.",
            data: null,
        }
        const { success, message, table } = this.getTableByName(tableName)
        if (!table) return { ...response, success, message }
        if (!filters) return { ...response, data: SSDB.getAllItems(table) }
        return { ...response, data: SSDB.getItemsByFilters(table, filters) }
    }

    /**
     * @param {string} tableName the name of table(tab) in the database(spreadsheet)
     * e.g. users
     * @param {object} filters an object of key:value pairs
     * default is null (get all data without any filters)
     * e.g. {name: "Ashton Fei", role: ["admin", "staff"]}
     * note: value can be an array for multiple values in one column
     */
    static post(tableName, filters = []) {
        const { success, message, table } = this.getTableByName(tableName)
        if (!table) return { success, message }
        return {
            success,
            message: "Items have been posted from the database.",
            data: table.getDataRange().getValues()
        }
    }

    /**
     * @param {string} tableName the name of table(tab) in the database(spreadsheet)
     * e.g. users
     * @param {object} filters an object of key:value pairs
     * default is null (get all data without any filters)
     * e.g. {name: "Ashton Fei", role: ["admin", "staff"]}
     * note: value can be an array for multiple values in one column
     */
    static delete(tableName, filters = []) {
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

    static hashPassword(password) {
        const signature = Utilities.computeHmacSha256Signature(password, SETTINGS.SECRECT)
        return Utilities.base64EncodeWebSafe(signature)
    }

    static validatePassword(password, correctHashPassword) {
        return this.hashPassword(password) === correctHashPassword
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
        const response = {
            success: true,
            message: 'You are signed in successfully.',
            data: null
        }

        // get users by email address
        const { success, message, data } = API.get(SETTINGS.AUTH_TABLE_NAME, {email})
        if (!success) return { ...response, success, message }

        // if user is not found
        const user = data[0]
        if (!user) return { ...response, success: false, message: "Your credentials are not correct." }

        // if password is not valid
        const isPasswordValid = this.validatePassword(password, user.password)
        if (!isPasswordValid) return { ...response, success: false, message: "Your credentials are not correct." }

        user.token = JWT.createToken(user)
        return { ...response, data: user }
    }

    static signout(token) {

    }
}