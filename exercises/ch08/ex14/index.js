export function any(...funs) {
    return function (n) {
        for (fun of funs) {
            if (fun(n)) return true // いずれかの関数が true を返せば true を返す
        }
        return false
    }
}

export function catching(fun1, fun2) {
    return function (arg) {
        try {
            fun1(arg) // 1 つ目の関数で発生した例外
        } catch (e) {
            return fun2(e) // 2 つ目の関数の引数として処理し結果を返す
        }
        return fun1(arg)
    }
}