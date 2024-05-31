import { popfun, pushfun, unshiftfun, shiftfun, sortfun } from "."

describe("非破壊的な操作", () => {
    it("push", () => {
        let u
        expect(pushfun(u, 3)).toBe(undefined)
        expect(u).toBe(undefined)
        let a = []
        expect(pushfun(a, 3)).toStrictEqual([3])
        expect(a).toStrictEqual([])
        let b = [1, 2, 3]
        expect(pushfun(b, 4)).toStrictEqual([1, 2, 3, 4])
        expect(b).toStrictEqual([1, 2, 3])
    })
    it('pop', () => {
        let u
        expect(popfun(u)).toBe(undefined)
        expect(u).toBe(undefined)
        let a = []
        expect(popfun(a)).toStrictEqual([])
        expect(a).toStrictEqual([])
        let b = [1, 2, 3]
        expect(popfun(b)).toStrictEqual([1, 2])
        expect(b).toStrictEqual([1, 2, 3])
    })
    it("shift", () => {
        let u
        expect(shiftfun(u, 3)).toBe(undefined)
        expect(u).toBe(undefined)
        let a = []
        expect(shiftfun(a, 3)).toStrictEqual([3])
        expect(a).toStrictEqual([])
        let b = [1, 2, 3]
        expect(shiftfun(b, 4)).toStrictEqual([4, 1, 2, 3])
        expect(b).toStrictEqual([1, 2, 3])
    })
    it("unshift", () => {
        let u
        expect(unshiftfun(u)).toBe(undefined)
        expect(u).toBe(undefined)
        let a = []
        expect(unshiftfun(a)).toStrictEqual([])
        expect(a).toStrictEqual([])
        let b = [1, 2, 3]
        expect(unshiftfun(b)).toStrictEqual([2, 3])
        expect(b).toStrictEqual([1, 2, 3])
    })
    it("sort", () => {
        let u
        expect(sortfun(u)).toBe(undefined)
        expect(u).toBe(undefined)
        let a = []
        expect(sortfun(a)).toStrictEqual([])
        expect(a).toStrictEqual([])
        let b = [4, 2, 6, 4, 8, 9]
        expect(sortfun(b)).toStrictEqual([2, 4, 4, 6, 8, 9])
        expect(b).toStrictEqual([4, 2, 6, 4, 8, 9])
        let c = [2]
        expect(sortfun(c)).toStrictEqual([2])
        expect(c).toStrictEqual([2])
    })
})
