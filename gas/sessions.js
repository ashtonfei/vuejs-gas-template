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