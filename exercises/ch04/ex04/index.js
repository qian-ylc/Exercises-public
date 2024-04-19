export function bitCount(x) {
    let count = 1
    while (x > 1) {
        if (x % 2 === 1) {
            count++
        }
        x = parseInt(x / 2)
    }
    return count
}