import { equal } from ".";

describe("equal", () => {
    it("(0.3 - 0.2, 0.1) -> true", async () => {
        expect(equal(0.3 - 0.2, 0.1)).toBe(true);
    });
    it("(0.2 - 0.1, 0.1) -> true", async () => {
        expect(equal(0.2 - 0.1, 0.1)).toBe(true);
    });
});