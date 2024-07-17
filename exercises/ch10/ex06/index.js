
// エクスポートしないjsファイルを複数回importする場合、
// import文の前後やimport先のコードの実行順序はどうなりますか。
// 実証コードを作成し、予想してから実行結果を確認しなさい。


console.log(global)

import "./sideEffect.js"
import "./sideEffect.js"
import "./sideEffect.js"

