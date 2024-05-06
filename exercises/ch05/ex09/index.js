export function isJSON(x) {
    let isSuccess = false
    let message
    try {
        JSON.stringify(x)
        isSuccess = true
    } catch (e) {
        message = e
        isSuccess = false
    } finally {
        if (isSuccess) {
            console.log("{success: true, data: " + x)
            return "{success: true, data: " + x + "}"
        }
        console.log("{success: false, error:" + message + "}")
        return "{success: false, error:" + message + "}"
    }
}
