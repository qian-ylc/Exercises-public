import { primes } from ".";

describe("primes", () => {
    it("最初五つの素数", () => {
        let p = primes();
        expect(p.next().value).toBe(2);
        expect(p.next().value).toBe(3);
        expect(p.next().value).toBe(5);
        expect(p.next().value).toBe(7);
        expect(p.next().value).toBe(11);
    })

    it("100番目の素数", () => {
        let p = primes();
        for (let i = 0; i < 99; i++) {
            p.next();
        }
        expect(p.next().value).toBe(541);
    })
})