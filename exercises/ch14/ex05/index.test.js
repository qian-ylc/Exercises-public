import { toTypeString } from ".";

describe("toTypeString", () => {
    it("中身の値をその型名にする", () => {
        expect(toTypeString`${"A"}`).toBe("string");
        expect(toTypeString`${{ x: 1 }}`).toBe("object");
        expect(toTypeString`${{}}`).toBe("object");
        expect(toTypeString`${16}`).toBe("number");
        expect(toTypeString`${true}`).toBe("boolean");
        expect(toTypeString`${[]}`).toBe("object");
        expect(toTypeString`${() => { }}`).toBe("function");
    });
});