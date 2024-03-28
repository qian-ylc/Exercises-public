const fib = (x) => {
    if (x <= 2) {
        return 1
    }
    let a = 1
    let b = 1
    let i = 3
    let result = 0
    while (i <= x) {
        result = a + b
        a = b
        b = result
        i += 1
    }
    return result
}

export { fib }