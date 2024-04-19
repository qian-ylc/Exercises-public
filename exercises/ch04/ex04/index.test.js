import { bitCount } from ".";

describe("bitCount", () => {
    it("0b111", async () => {
        expect(bitCount(0b111)).toBe(3);
    })
    it("0b1111111111111111111111111111111", async () => {
        expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
    })
})
