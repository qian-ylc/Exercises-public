import { instanceOf } from ".";
import { fighter, magicFighter } from "../ex04/index";

describe("instanceOf", () => {
    const f = new fighter(10);
    const mf = new magicFighter(10, 5);
    test("fはfighterのインスタンス", () => {
        expect(instanceOf(f, fighter)).toBe(true);
    });
    test("fはmagicFighterのインスタンスではない", () => {
        expect(instanceOf(f, magicFighter)).toBe(false);
    });
    test("mfはfighterのインスタンス", () => {
        expect(instanceOf(mf, fighter)).toBe(true);
    });
    test("mfはmagicFighterのインスタンス", () => {
        expect(instanceOf(mf, magicFighter)).toBe(true);
    });
})