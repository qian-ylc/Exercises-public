export function exp1(x, n) {
    if (n === 0) {
        return 1
    }
    if (n === 1) {
        return x
    }
    return x * exp1(x, n - 1)
}

export function exp2(x, n) {
    let result = 1;
    for (let i = 0; i < n; i++) {
        result *= x
    }
    return result
}

export function exp3(x, n) {
    if (n === 0) {
        return 1
    }
    if (n === 1) {
        return x
    }
    if (n % 2 === 0) {
        return exp3(x, n / 2) * exp3(x, n / 2)
    } else {
        return x * exp3(x, (n - 1) / 2) * exp3(x, (n - 1) / 2)
    }
}
