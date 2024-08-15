// npx jest ch12/ex05/index.test.js

describe("readLines", () => {
    const { readLines } = require("./index.js");
    it("ファイルを改行コードの出現ごとに分割", () => {
        let filePath = "ch12/ex05/test.md";
        let gen = readLines(filePath);
        expect(gen.next().value).toBe("aaaaa");
        expect(gen.next().value).toBe("bbbbb");
        expect(gen.next().value).toBe("ccccc");
        expect(gen.next().value).toBe("ddddd");
        expect(gen.next().done).toBe(true);
    })
    it("空ファイルの場合", () => {
        let filePath = "ch12/ex05/test2.md";
        let gen = readLines(filePath);
        expect(gen.next().value).toBe("");
        expect(gen.next().done).toBe(true);
    })
})