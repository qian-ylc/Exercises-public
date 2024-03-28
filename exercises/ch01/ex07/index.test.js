import { Point } from "./index"

describe("Point", () => {
    it("returns (x+a, y+b) when (x,y) and (a,b) given", () => {
        let a = new Point(2, 3)
        let b = new Point(3, 2)
        expect(a.add(b).x).toBe(5);
        expect(a.add(b).y).toBe(5);
    })
})