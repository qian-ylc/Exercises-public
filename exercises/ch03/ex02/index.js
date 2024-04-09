console.log(Number.MAX_VALUE)
console.log(Number.MIN_VALUE)
console.log(Number.MAX_SAFE_INTEGER)
console.log(Number.MIN_SAFE_INTEGER)
console.log(Number.MAX_VALUE + 1)
console.log(Number.MAX_SAFE_INTEGER + 1)
// 二つともtrueと出力される。最大値を超える数値は正確に表現できない
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
console.log(Number.MAX_VALUE + 1 === Number.MAX_VALUE + 2)
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2)