import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

export async function* walk(rootPath) {
    try {
        // 全てのファイルとディレクトリを取得
        let entries = await fsPromises.readdir(rootPath, { withFileTypes: true });
        let value = ""; // 出力の文字列
        for (let entry of entries) {
            let currentPath = join(rootPath, entry.name);
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
    }
}

// for awaitを使うのが必要
for await (let entry of walk("ch12/ex06/testEmpt")) {
    console.log(entry);
}