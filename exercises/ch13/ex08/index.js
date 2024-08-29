import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

export async function fetchFirstFileSize(path) {
    try {
        let files = await fsPromises.readdir(path);
        if (files.length === 0) {
            throw new Error("files.length === 0");
        }
        let stats = await fsPromises.stat(join(path, files[0]));
        return stats.size
    } catch (e) {
        throw new Error(e);
    }
}

export async function fetchSumOfFileSizes(path) {
    try {
        let files = await fsPromises.readdir(path);
        let total = 0;
        // function iter()にはawaitを使えないため、for ofを使う
        for (let file of files) {
            let stats = await fsPromises.stat(join(path, file));
            total += stats.size;
        };
        return total;
    } catch (e) {
        throw new Error(e);
    }
}

// let a = await fetchFirstFileSize("./ch13/ex08/testdirempty");
// console.log(fetchFirstFileSize("./ch13/ex08/testdirempty").rejects)
// let b = await fetchSumOfFileSizes("./ch13/ex08/testdir");
// console.log(b)