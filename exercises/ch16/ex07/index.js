import fs from 'node:fs/promises';
// スペシャルファイル

export async function checkEntry(path) {
    try {
        const stats = await fs.stat(path);
        if (stats.isDirectory()) {
            return 'directory';
        } else if (stats.isFile()) {
            return 'file';
        } else {
            return 'other';
        }
    } catch (error) {
        // 存在しないパス
        if (error.code === 'ENOENT') {
            return 'not found';
        }
        return 'error';
    }
}

// console.log(await checkEntry('./dir'));
// console.log(await checkEntry('./dir/dir1/file1'));




