import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

export async function fetchSumOfFileSizes(path) {
    let total = 0;
    try {
        let files = await fsPromises.readdir(path);
        // filesの各パスのファィルサイズを取得し、totalに加算する
        let stats = await Promise.all(files.map(async (file) => {
            return await fsPromises.stat(join(path, file));
        }));
        total = stats.reduce((acc, cur) => acc + cur.size, 0);
        return total;

    } catch (e) {
        throw new Error(e);
    }
}