export function withResource(resource, f) {
    try {
        f(resource) // まずは関数を実行
    }
    catch (e) {
        throw Error(e) // エラーがある時エラーをthrow
    }
    finally {
        resource.close.call(resource) // 最後にclose操作を
    }
}




