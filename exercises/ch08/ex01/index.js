const a = (n, c) => {
    for (let i = 0; i < n; i++) {
        console.log(c)
    }
    let result = new Array(n)
    return result.fill(c)
} // 引数が二つで括弧が必要、戻り値が二行以上で括弧が必要

const b = x => x * x
// 引数が一つだけで括弧が必要ない、戻り値もreturn文だけでreturnと括弧を省略

const c = () => ({ now: new Date() })
// 引数なしでは括弧が必要で、戻り値がオブジェクトリテラルの場合はオブジェクトリテラルを丸括弧の中に記述

export { a, b, c }