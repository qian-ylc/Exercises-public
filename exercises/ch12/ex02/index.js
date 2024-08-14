export function fibonacciSequence() {
    let x = 0, y = 1;
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            const value = y;
            [x, y] = [y, x + y];
            return { value, done: false }
        }
    }
}