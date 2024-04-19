import { complex, add, sub, mul, div } from "."

describe("複素数演算", () => {
    it("add: (1+2i) + (3-4i)", async () => {
        let a = new complex(1, 2)
        let b = new complex(3, -4)
        expect(add(a, b).re).toBe(4);
        expect(add(a, b).im).toBe(-2);
    });
    it("add: 5 + -10 ", async () => {
        let a = new complex(5, 0)
        let b = new complex(-10, 0)
        expect(add(a, b).re).toBe(-5);
        expect(add(a, b).im).toBe(0);
    });
    it("sub: (5+6i) - (3+4i) ", async () => {
        let a = new complex(5, 6)
        let b = new complex(3, 4)
        expect(sub(a, b).re).toBe(2);
        expect(sub(a, b).im).toBe(2);
    });
    it("sub: (6i) - (4i) ", async () => {
        let a = new complex(0, 6)
        let b = new complex(0, 4)
        expect(sub(a, b).re).toBe(0);
        expect(sub(a, b).im).toBe(2);
    });
    it("mul: (1+2i) * (3+4i) ", async () => {
        let a = new complex(1, 2)
        let b = new complex(3, 4)
        expect(mul(a, b).re).toBe(-5);
        expect(mul(a, b).im).toBe(10);
    });
    it("mul: (0) * (3+4i) ", async () => {
        let a = new complex(0, 0)
        let b = new complex(3, 4)
        expect(mul(a, b).re).toBe(0);
        expect(mul(a, b).im).toBe(0);
    });
    it("div: (1+2i) / (3+4i) ", async () => {
        let a = new complex(1, 2)
        let b = new complex(3, 4)
        expect(div(a, b).re).toBe(0.44);
        expect(div(a, b).im).toBe(0.08);
    });
    //0がある場合
    it("div: 0 / (3+4i) ", async () => {
        let a = new complex(0, 0)
        let b = new complex(3, 4)
        expect(div(a, b).re).toBe(0);
        expect(div(a, b).im).toBe(0);
    });
    it("div: (10) / (4i) ", async () => {
        let a = new complex(10, 0)
        let b = new complex(0, 4)
        expect(div(a, b).re).toBe(0);
        expect(div(a, b).im).toBe(-2.5);
    });
    it("div: (-4i) / (10) ", async () => {
        let a = new complex(0, -4)
        let b = new complex(10, 0)
        expect(div(a, b).re).toBe(0);
        expect(div(a, b).im).toBe(-0.4);
    });
    it("div: (1+2i) / (0) ", async () => {
        let a = new complex(1, 2)
        let b = new complex(0, 0)
        expect(div(a, b).re).toBe(NaN);
        expect(div(a, b).im).toBe(NaN);
    });
})