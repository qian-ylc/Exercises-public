// f はオブジェクトを1つ引数に取る関数
export function cache(f) {
    let cache = new WeakMap();
    // 結果を計算してキャッシュに保存
    let setCache = function (obj) {
        let result = f(obj)
        cache.set(obj, result)
    }
    return {
        cachedSlowFn: function (obj) {
            // キャッシュに保存された計算結果を返す
            if (cache.has(obj)) {
                return cache.get(obj)
            } else { // ないなら計算してキャッシュに保存
                setCache(obj)
                return cache.get(obj)
            }
        },

    }
}

export function slowFn(obj) {
    let result;
    let a = Object.getOwnPropertyNames(obj)
    for (let i = 0; i <= 100000; i++) {
        if (i === 1000) { result = a + i };
    }
    return result
}
