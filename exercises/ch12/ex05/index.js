exports.readLines = function* readLines(filePath) {
    const fs = require('fs');
    let buf = new Buffer.alloc(1024);
    try {
        let fd = fs.openSync(filePath, 'r');
        let content = '';
        let readBytes = 0;
        // 全ての内容を読み込む
        while (true) {
            readBytes = fs.readSync(fd, buf, 0, buf.length, null);
            if (readBytes === 0) {
                break;
            }
            content += buf.toString('utf8', 0, readBytes);
        }
        // 改行コードで分割
        // console.log(content);
        let lines = content.split('\n');
        for (let line of lines) {
            yield line;
        }
    } catch (e) {
        console.log("error: ")
        console.log(e);
    } finally {
        // fs.closeSync(fd); // fd is not defined. tryのfdをクローズ？
    }
}