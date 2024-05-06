import { isJSON } from ".";

describe("文字列がJSONとしてパースできるか", () => {
    it('{"x":5, "y":6}', () => {
        expect(isJSON('{"x":5, "y":6}')).toBe("{success: true, data: {\"x\":5, \"y\":6}}")
    })
    it("[new Number(3), new String('false'), new Boolean(false)])", () => {
        expect(isJSON("[new Number(3), new String('false'), new Boolean(false)])")).toBe("{success: true, data: [new Number(3), new String('false'), new Boolean(false)])}")
    })
    it("new Date(2006, 0, 2, 15, 4, 5))", () => {
        expect(isJSON("new Date(2006, 0, 2, 15, 4, 5))")).toBe("{success: true, data: new Date(2006, 0, 2, 15, 4, 5))}")
    })
    it("a", () => {
        expect(isJSON("a")).toBe("{success: true, data: a}")
    })
    it("", () => {
        expect(isJSON("")).toBe("{success: true, data: }")
    })
    //JSON.stringify()がエラーになる場合
    it("BigInt(1101)", () => {
        expect(isJSON(BigInt(1101))).toBe("{success: false, error:TypeError: Do not know how to serialize a BigInt}")
    })
    it("", () => {
        const obj1 = {}
        const obj2 = { obj1 }
        obj1.x = obj2
        expect(isJSON(obj1)).toBe(`{success: false, error:TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    |     property 'x' -> object with constructor 'Object'
    --- property 'obj1' closes the circle}`)
    })

})