import { fibonacciSequence } from ".";

describe("fibonacciSequence", () => {
    it("1 1 2 3 5", () => {
        const fib = fibonacciSequence();
        expect(fib.next()).toEqual({ value: 1, done: false });
        expect(fib.next()).toEqual({ value: 1, done: false });
        expect(fib.next()).toEqual({ value: 2, done: false });
        expect(fib.next()).toEqual({ value: 3, done: false });
        expect(fib.next()).toEqual({ value: 5, done: false });
    })
    it("fibonacci(20) = 10946", () => {
        const fib = fibonacciSequence();
        for (let i = 0; i < 20; i++) {
            fib.next();
        }
        expect(fib.next()).toEqual({ value: 10946, done: false });
    })
})