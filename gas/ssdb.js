class SSDB {
    constructor(id = SETTINGS.SSDB_ID) {
        this.id = id
        this.db = SpreadsheetApp.openById(this.id)
    }
}