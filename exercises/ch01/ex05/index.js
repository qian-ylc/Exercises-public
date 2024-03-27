const abs = (x) => {
    if (x >= 0) {
        return x
    }
    else {
        return -x
    }
}

const sum = (array) => {
    let sum = 0
    for (let i of array) {
        sum = sum + i
    }
    return sum
}

const factorial = (n) => {
    let product = 1
    while (n > 1) {
        product *= n
        n--
    }
    return product
}

export { abs, sum, factorial }