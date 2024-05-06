export function* fib() {
    let a = 1
    let b = 1
    let r = 1
    yield 1
    yield 1
    while (1) {
        r = a + b
        a = b
        b = r
        yield r
    }
}
