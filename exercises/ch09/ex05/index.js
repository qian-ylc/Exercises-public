// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/instanceof
// instanceof 演算子は、あるコンストラクターの prototype プロパティが、あるオブジェクトのプロトタイプチェーンの中
// のどこかに現れるかどうかを検査します
export function instanceOf(object, constructor) {
    if (object === null || object === undefined) return false
    if (constructor === null || constructor === undefined) {
        throw Error("Uncaught TypeError: Right-hand side of 'instanceof' is not an object")
    }
    // コンストラクターの prototype プロパティが、objectのプロトタイプチェーンに存在するかどうかを判定
    if (constructor.prototype.isPrototypeOf(object)) return true
    return false
}