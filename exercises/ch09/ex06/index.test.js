import { TypedMap } from ".";

describe("TypedMap", () => {
    test("TypedMapのインスタンスを作成してエントリーを追加する", () => {
        const tm = new TypedMap("string", "number");
        tm.set("key1", 1);
        expect(tm.map.size).toBe(1);
        expect(tm.map.get("key1")).toBe(1);
    });
    test("TypedMapに異なる型のエントリーを追加できない", () => {
        const tm = new TypedMap("string", "number");
        expect(() => tm.set(1, 1)).toThrow();
        expect(() => tm.set("key1", "1")).toThrow();
        expect(() => tm.set(1, "1")).toThrow();
    })
})