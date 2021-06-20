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