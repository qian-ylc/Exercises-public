// 組み込み関数
console.log(Math.pow.toString()) // function pow() { [native code] }
console.log(eval.toString()) // function eval() { [native code] }
console.log(toString.toString()) // function toString() { [native code] }

// 自作関数
function f(x) {
    return x * 2
}
console.log(f.toString()) // 'function f(x) {\n    return x * 2\n}'
function ff() {
    let n = 0
    return function g() {
        return n++
    }
}
console.log(ff.toString())
/*
'function ff() {\n' +
  '    let n = 0\n' +
  '    return function g() {\n' +
  '        return n++\n' +
  '    }\n' +
  '}'
*/