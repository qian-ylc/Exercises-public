import { obj } from ".";

describe("アクセサプロパティとしてデカルト座標 x と y をもつオブジェクト", () => {
    it("xとyをgetterでアクセス", () => {
        obj.r = 10
        obj.theta = Math.PI / 4 //ラジアン  
        expect(Math.round(obj.x * 1000)).toBe(Math.round(5 * Math.SQRT2 * 1000)); //小数第三位
        expect(Math.round(obj.y * 1000)).toBe(Math.round(5 * Math.SQRT2 * 1000));
    })
    it("setterでxとyをセット", () => {
        obj.r = 10
        obj.theta = Math.PI / 4 //ラジアン 
        obj.x = 20
        expect(Math.round(obj.r * 1000)).toBe(Math.round(20 * Math.SQRT2 * 1000));
    })
    it("thetaは90°の場合", () => {
        obj.r = 10
        obj.theta = Math.PI / 2
        expect(Math.round(obj.x)).toBe(0);
        expect(Math.round(obj.y)).toBe(10);
        obj.y = 20
        expect(Math.round(obj.r)).toBe(20);
        obj.x = 1
        expect(Math.round(obj.r)).toBe(16331239353195370); //  Math.tan ( Math.PI / 2) = 16331239353195370
    })
    it("thetaは0°の場合", () => {
        obj.r = 10
        obj.theta = 0
        expect(Math.round(obj.x)).toBe(10);
        expect(Math.round(obj.y)).toBe(0);
        obj.x = 20
        expect(Math.round(obj.r)).toBe(20);
        obj.y = 1
        expect(Math.round(obj.r)).toBe(Infinity);
    })
    it("NaNがある場合", () => {
        obj.r = 10
        obj.theta = Math.PI / 4
        expect(() => { obj.x = NaN }).toThrow("x is NaN")
        expect(() => { obj.y = NaN }).toThrow("y is NaN")
    })
})