import { any, catching } from ".";

describe("any", () => {
    const isNonZero = any(
        (n) => n > 0,
        (n) => n < 0
    );

    it("いずれかの関数が true を返せば true を返す", () => {
        expect(isNonZero(0)).toBe(false)
        expect(isNonZero(42)).toBe(true)
        expect(isNonZero(-0.5)).toBe(true)
    })
})

describe("catching", () => {
    const safeJsonParse = catching(JSON.parse, (e) => {
        return { error: e.toString() };
    });

    it("1 つ目の関数で発生した例外を 2 つ目の関数の引数として処理し結果を返す", () => {
        expect(safeJsonParse('{"a": 1}')).toStrictEqual({ a: 1 })
        expect(safeJsonParse("{Invalid Json}")).toStrictEqual({
            error: "SyntaxError: Expected property name or '}' in JSON at position 1"
        })
    })
})