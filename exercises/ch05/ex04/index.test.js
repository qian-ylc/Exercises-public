import { fibWhile, fibDoWhile, fibFor } from "."

describe("フィボナッチ数列の最初の 10 個", () => {
    it('whileの場合', () => {
        expect(fibWhile()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    })
    it('dowhileの場合', () => {
        expect(fibDoWhile()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    })
    it('forの場合', () => {
        expect(fibFor()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    })
})