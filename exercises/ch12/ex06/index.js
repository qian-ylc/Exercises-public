exports.walk = function* walk(rootPath) {
    const fs = require('fs');
    const path = require('path');

    // fs.readdirSyncのcallback: yieldは入れ子に使えない
    try {
        // 全てのファイルとディレクトリを取得
        let entries = fs.readdirSync(rootPath, { withFileTypes: true });
        let value = ""; // 出力の文字列
        // 順番にファイルとディレクトリを処理
        for (let entry of entries) {
            let currentPath = path.join(rootPath, entry.name);
            // ディレクトリの場合は再帰的に処理
            if (entry.isDirectory()) {
                value = `{ path: "${currentPath}", isDirectory: true }`
                yield value;
                yield* walk(currentPath);
            } else {
                value = `{ path: "${currentPath}", isDirectory: false }`
                yield value;
            }
        }
    } catch (e) {
        console.log("error: " + e)
        return false
    }
}

// 取得できるデータは以下のプロパティを持つオブジェクトにすること。
// fs.readdirSync(rootPath, { withFileTypes: true })で取得するデータ？fs.dirent
