import { Hiragana } from ".";

describe("Hiragana", () => {
    test("toPrimitive", () => {
        const hiragana = new Hiragana("あ");
        expect(String(hiragana)).toBe("あ");
        expect(Number(hiragana)).toBe(12354);
        expect(hiragana + "").toBe("あ");
        expect(hiragana + 0).toBe("あ0");
    });

    // やと比較
    test("compare", () => {
        const hiragana1 = new Hiragana("あ");
        const hiragana2 = new Hiragana("や");
        expect(hiragana1 < hiragana2).toBe(true);
    });
})