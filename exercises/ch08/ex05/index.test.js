import { sequenceToObject } from ".";

describe("sequenceToObject", () => {
    it("一般的な場合", () => {
        expect(sequenceToObject("a", 1, "b", 2)).toStrictEqual({ a: 1, b: 2 })
        expect(sequenceToObject()).toStrictEqual({})
        expect(sequenceToObject("a", 1, "b", "2", "c", true, "d", { x: 1 }, "e", [1, 2])).toStrictEqual({
            a: 1,
            b: '2',
            c: true,
            d: { x: 1 },
            e: [1, 2],
        })
    })
    it("例外の場合", () => {
        expect(() => sequenceToObject(1, 1, "b", 2)).toThrowError("奇数番の値が string でない")
        expect(() => sequenceToObject("a", 1, "b")).toThrowError("値の個数の合計が偶数ではない")
    })
    it("スプレッド演算子の場合", () => {
        let a = ["a", 1, "b", 2]
        expect(sequenceToObject(...a)).toStrictEqual({ a: 1, b: 2 })
    })
})