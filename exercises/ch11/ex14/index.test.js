import { sortJapanese, toJapaneseDateString } from ".";

describe("sortJapanese", () => {
    test("あいうえお", () => {
        const array = ["う", "お", "あ", "い", , "え",];
        expect(sortJapanese(array)).toEqual(["あ", "い", "う", "え", "お"]);
    });
    test("大文字・小文字がある場合", () => {
        const array = ["あ", "い", "う", "え", "お", "ぁ", "ぃ", "ぅ"];
        expect(sortJapanese(array)).toEqual(["あ", "ぁ", "い", "ぃ", "う", "ぅ", "え", "お"]);
    });
    test("濁点・半濁点がある場合", () => {
        const array = ["あ", "い", "は", "お", "か", "が", "き", "く", "ぐ", "ぎ"];
        expect(sortJapanese(array)).toEqual([
            'あ', 'い', 'お',
            'か', 'が', 'き',
            'ぎ', 'く', 'ぐ',
            'は'
        ]);
    })
})

describe("toJapaneseDateString", () => {
    test("2024/7/28", () => {
        const date = new Date("2024-07-28");
        expect(toJapaneseDateString(date)).toEqual("令和6年7月28日");
    });
    test("2000/1/1", () => {
        const date = new Date("2000-01-01");
        expect(toJapaneseDateString(date)).toEqual("平成12年1月1日");
    })
    test("2019/7/1", () => {
        const date = new Date("2019-07-01");
        expect(toJapaneseDateString(date)).toEqual("令和元年7月1日");
    })
})