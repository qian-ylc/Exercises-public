import { printProperty } from ".";

describe("すべての独自プロパティ及び列挙可能な継承プロパティ", () => {
    let o1 = { x1: 2, y1: 3, z1: 4 }
    let o0 = {}
    it("空オブジェクト", () => {
        expect(printProperty(o0)).toStrictEqual([]);
    })

    it("", () => {
        // プロトタイプに列挙不可のプロパティを追加
        Object.defineProperty(o1, "z1", {
            value: 5,
            enumerable: false
        })
        let o2 = Object.create(o1)
        // 独自プロパティーを追加、列挙不可やSymbol含む
        o2.x2 = 20
        o2.y2 = 30
        let s2 = Symbol("s2")
        o2[s2] = 50
        Object.defineProperty(o2, "z2", {
            value: 50,
            enumerable: false
        })
        //toStrictEqualで直接比較するとReceived: serializes to the same stringになる
        expect(JSON.stringify(printProperty(o2))).toStrictEqual(JSON.stringify(['x2', 'y2', 'z2', Symbol("s2"), 'x1', 'y1']));
    })

})