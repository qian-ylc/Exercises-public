import * as iconv from "iconv-lite";
import * as fsPromises from "node:fs/promises";

// hello.txtを読み込む
// iconv-liteでSHIFT_JISでデコード
try {
    const textBuffer = await fsPromises.readFile("./hello.txt")
    const text = iconv.decode(textBuffer, "shift-jis");
    console.log(text)
} catch (e) {
    console.error(e);
}



