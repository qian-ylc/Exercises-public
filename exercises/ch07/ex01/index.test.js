import { determulti, deterplus } from ".";

describe("行列の加算", () => {
    it("行列の形が違う場合", () => {
        let a = [[1, 2, 3], [4, 5, 6], [7, 8]]
        let b = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        expect(deterplus(a, b)).toBe()
    })
    it("正方行列の場合", () => {
        let a = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        let b = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        expect(deterplus(a, b)).toStrictEqual([[2, 4, 6], [8, 10, 12], [14, 16, 18]])
    })
    it("3x2行列の場合", () => {
        let a = [[1, 2, 3], [4, 5, 6]]
        let b = [[1, 2, 3], [4, 5, 6]]
        expect(deterplus(a, b)).toStrictEqual([[2, 4, 6], [8, 10, 12]])
    })

    describe("行列掛け算", () => {
        it("行列の形が計算できない場合", () => {
            let a = [[1, 2, 3], [4, 5, 6], [7, 8]]
            let b = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
            expect(determulti(a, b)).toBe()
        })
        it("正方行列の場合", () => {
            let a = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
            let b = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
            expect(determulti(a, b)).toStrictEqual([[30, 36, 42], [66, 81, 96], [102, 126, 150]])
        })
        it("3x2行列と2x3行列の場合", () => {
            let a = [[1, 2, 3], [4, 5, 6]]
            let b = [[1, 2], [3, 4], [5, 6]]
            expect(determulti(a, b)).toStrictEqual([[22, 28], [49, 64]])
        })

    })
})