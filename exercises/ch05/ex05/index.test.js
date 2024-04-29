import { evenExtract } from ".";
describe('値が偶数のプロパティだけを持ちオブジェクトを返す', () => {
    it('{a: 1, b: 2, c: 3} ', () => {
        expect(evenExtract({ a: 1, b: 2, c: 3 })).toStrictEqual({ b: 2 });
    })
    it('{a: 1, b: 3, c: 5} ', () => {
        expect(evenExtract({ a: 1, b: 3, c: 5 })).toStrictEqual({});
    })
    it('{a: 2, b: 4, c:6} ', () => {
        expect(evenExtract({ a: 2, b: 4, c: 6 })).toStrictEqual({ a: 2, b: 4, c: 6 });
    })
    it('{} ', () => {
        expect(evenExtract({})).toStrictEqual({});
    })
})