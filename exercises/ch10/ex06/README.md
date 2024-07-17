```
if (typeof global.globalCounter === 'undefined') {
    global.globalCounter = 0; // グローバル変数を初期化
}

global.globalCounter++;
```
```
import "./sideEffect.js"
import "./sideEffect.js"
import "./sideEffect.js"

console.log(global) // globalCounter: 1
```
エクスポートしないjsファイルを複数回importしても、一回だけ実行される。

```
console.log(global) // globalCounter: 1

import "./sideEffect.js"
import "./sideEffect.js"
import "./sideEffect.js"

```
インポート文を下に置いても、インポート文が先に一回だけ実行されて、結果が同じ


