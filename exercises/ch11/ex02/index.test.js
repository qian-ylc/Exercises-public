import { cache, slowFn } from ".";

describe("cache", () => {
    test("キャッシュされた計算結果の計算時間が少なくなる", () => {
        const c = cache(slowFn);
        const obj = { a: 1, b: 2, c: 3 };
        // キャッシュされていない計算結果の計算時間
        let start1 = performance.now();
        c.cachedSlowFn(obj);
        let end1 = performance.now();
        // キャッシュされた計算結果の計算時間
        let start2 = performance.now();
        c.cachedSlowFn(obj);
        let end2 = performance.now();
        console.log(end1 - start1, end2 - start2); // 0.6259160004556179 0.0008330009877681732
        expect(end2 - start2).toBeLessThan(end1 - start1);
    });
})