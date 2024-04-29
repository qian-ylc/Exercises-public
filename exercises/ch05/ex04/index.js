export function fibWhile() {
    let result = [1, 1]
    let i = 2
    while (i < 10) {
        result.push(result[i - 1] + result[i - 2])
        i++
    }
    return result
}

export function fibDoWhile() {
    let result = [1, 1]
    let i = 2
    do {
        result.push(result[i - 1] + result[i - 2])
        i++
    } while (i < 10);
    return result
}

export function fibFor() {
    let result = [1, 1]
    for (let i = 2; i < 10; i++) {
        result.push(result[i - 1] + result[i - 2])
    }
    return result
}

console.log(fibFor())
