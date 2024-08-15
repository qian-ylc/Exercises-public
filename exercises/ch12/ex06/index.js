exports.walk = function* walk(rootPath) {
    const fs = require('fs');
    const path = require('path');

    // fs.readdirSyncのcallback: yieldは入れ子に使えない
    try {
        let entries = fs.readdirSync(rootPath, { withFileTypes: true });
        for (let entry of entries) {
            let currentPath = path.join(rootPath, entry.name);
            if (entry.isDirectory()) {
                yield currentPath;
                yield* walk(currentPath);
            } else {
                yield currentPath;
            }
        }
    } catch (e) {
        console.log("error: " + e)
        return false
    }
}

// 取得できるデータは以下のプロパティを持つオブジェクトにすること。
// fs.readdirSync(rootPath, { withFileTypes: true })で取得するデータ？fs.dirent
