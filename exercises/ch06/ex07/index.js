// 列挙可能な独自プロパティー　Symbolも含む
// 同じ名前でプロパティが定義されていた場合、コピー先オブジェクトのプロパティを上書きし
export function assign(target, ...sources) {
    for (let source of sources) {
        for (let key of Reflect.ownKeys(source)) {
            if (!source.propertyIsEnumerable(key)) { continue } // 列挙不可なプロパティー
            console.log(key)
            target[key] = source[key]
        }
    }
    return target
}