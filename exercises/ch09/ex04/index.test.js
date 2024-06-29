import { fighter, magicFighter, createFighter, createMagicFighter } from ".";

describe("fighter class", () => {
    test("atkは10の戦士", () => {
        const f = new fighter(10);
        expect(f.atk).toBe(10);
        expect(f.attack()).toBe(20);
    });
})

describe("magicFighter class", () => {
    test("atkは10、mgcは5の魔法戦士", () => {
        const mf = new magicFighter(10, 5);
        expect(mf.atk).toBe(10);
        expect(mf.mgc).toBe(5);
        expect(mf.attack()).toBe(25);
    });
})

describe("prototype記法のcreateFighter", () => {
    test("atkは10の戦士", () => {
        const f = new createFighter(10);
        expect(f.atk).toBe(10);
        expect(f.attack()).toBe(20);
    });
})

describe("prototype記法のcreateMagicFighter", () => {
    test("atkは10、mgcは5の魔法戦士", () => {
        const mf = new createMagicFighter(10, 5);
        expect(mf.atk).toBe(10);
        expect(mf.mgc).toBe(5);
        expect(mf.attack()).toBe(25);
    });
})
