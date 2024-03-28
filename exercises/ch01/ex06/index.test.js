import { fib } from "./index"

describe("fib", () => {
    it("returns 5 when 5 given", () => {
        expect(fib(5)).toBe(5);
    })
    it("returns 2111485077978050 when 75 given", () => {
        expect(fib(75)).toBe(2111485077978050);
    })
})