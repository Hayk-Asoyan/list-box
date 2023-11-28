let timer
export const debounce = (callback, time = 750) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        callback()
    }, time)
}
export const searchInObjectValues = (obj, text) => {
    return obj.filter((item) => {
        const values = Object.values(item)
        for (const value of values) {
            if (typeof value === 'string' && value.toLowerCase().includes(text.toLowerCase())) {
                return true
            }
        }
        return false
    })
}
