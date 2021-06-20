const getLocalItem = (key) => {
    try {
        return localStorage.getItem(key)
    } catch (err) {
        return null
    }
}

const setLocalItem = (key, value) => {
    try {
        return localStorage.setItem(key, value)
    } catch (err) {
        //pass
    }
}

export { getLocalItem, setLocalItem }