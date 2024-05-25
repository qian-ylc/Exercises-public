import { assign } from ".";

describe("assignがObject.assign()と等価", () => {
    let o1 = { x1: 2, y1: 3, z1: 4, x: 40 }
    Object.defineProperty(o1, 'x', { enumerable: false })
    let s1 = Symbol("aa")
    o1[s1] = 10
    it("空オブジェクトに", () => {
        expect(assign({}, o1)).toStrictEqual(Object.assign({}, o1));
    })
    it("同名プロパティーがないオブジェクトに", () => {
        expect(assign({ x2: 7, y2: 8 }, o1)).toStrictEqual(Object.assign({ x2: 7, y2: 8 }, o1));
    })
    it("同名プロパティーがあるオブジェクトに", () => {
        expect(assign({ x2: 7, y2: 8, x1: 20 }, o1)).toStrictEqual(Object.assign({ x2: 7, y2: 8, x1: 20 }, o1));
    })
    it("同名プロパティーがある複数オブジェクトに", () => {
        expect(assign({ x1: 100, a: 1 }, { x2: 7, y2: 8, x1: 20 }, o1)).toStrictEqual(Object.assign({ x1: 100, a: 1 }, { x2: 7, y2: 8, x1: 20 }, o1));
    })
    it("列挙不可なプロパティーがコピーされない", () => {
        expect(assign({ x1: 100, a: 1, x: 5 }, o1)).toStrictEqual(Object.assign({ x1: 100, a: 1, x: 5 }, o1));
    })
})