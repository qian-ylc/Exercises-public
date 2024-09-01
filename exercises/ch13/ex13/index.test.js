import { walk } from ".";

describe("walk", () => {
    it("testフォルダを探索", async () => {
        let rootPath = "ch12/ex06/test"
        const expectedOutput = [
            `{ path: "ch12/ex06/test/test2", isDirectory: true }`,
            `{ path: "ch12/ex06/test/test2/testfile1.md", isDirectory: false }`,
            `{ path: "ch12/ex06/test/test2/testfile2.js", isDirectory: false }`,
            `{ path: "ch12/ex06/test/test3", isDirectory: true }`,
            `{ path: "ch12/ex06/test/test3/testfile3.md", isDirectory: false }`
        ]
        let result = [];

        // expectされたものが毎回変わるため、expectedOutputを先に作成
        for await (let entry of walk(rootPath)) {
            result.push(entry);
        }
        expect(result).toEqual(expectedOutput);
    });
    it("空フォルダの場合", async () => {
        let rootPath = "ch12/ex06/testEmpty"
        let result = [];
        for await (let entry of walk(rootPath)) {
            result.push(entry);
        }
        expect(result).toEqual([]);
    });
    it("存在しないフォルダの場合", async () => {
        let rootPath = "ch12/ex06/testEmp"
        let result = [];
        // スローされたエラーをチェック
        try {
            for await (let entry of walk(rootPath)) {
                result.push(entry);
            }
        } catch (e) {
            expect(e).toBe("error: Error: ENOENT: no such file or directory, scandir 'ch12/ex06/testEmp'");
        }
    });
});