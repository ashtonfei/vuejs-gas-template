class Session {
    constructor() {
        const cache = CacheService.getScriptCache()
        const expirationInSeconds = 6 * 60 * 60 // 6 hours
    }

    static generateSessionId() {
        return Utilities.base64Encode(Utilities.getUuid())
    }

    static getSession(sid) {
        const session = this.cache.get(sid)
        if (session === null) return session
        return this.createSession(sid, session)
    }

    static createSession(key, session) {
        this.cache.put(key, session, this.expirationInSeconds)
        return session
    }

    static deleteSession(sid) {
        this.cache.remove(sid)
    }
}

class SSDB {
    constructor(id = SETTINGS.SSDB_ID) {
        this.id = id
        this.db = SpreadsheetApp.openById(this.id)
    }
}

class API extends SSDB {
    constructor() {

    }

    getTableByName(name) {
        return this.db.getSheetByName(name)
    }

    static get(tableName, filters = {}) {
        let response = { success: true, message: `Items have been retrieved from database.` }
        const table = this.getTableByName(tableName)
        if (!table) response = { success: false, message: `${tableName} was not found in database.` }
        response.data = []
        return response
    }

    static post(tableName, stringify_json) {
        let response = { success: true, message: `Items have been updated in the database.` }
        const table = this.getTableByName(tableName)
        if (!table) response = { success: false, message: `${tableName} was not found in database.` }
        response.data = []
        return response
    }

    static delete(tableName, id) {
        let response = { success: true, message: `Items with ${id} have been deleted from ${tableName}.` }
        const table = this.getTableByName(tableName)
        if (!table) response = { success: false, message: `${tableName} was not found in database.` }
        response.data = null
        return response
    }
}