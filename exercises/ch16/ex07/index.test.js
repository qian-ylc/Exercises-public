import { checkEntry } from "./index.js";

// npm test ch16/ex07/index.test.js
describe("checkEntry", () => {
    test("ディレクトリならdirectoryを返す", async () => {
        const result = await checkEntry("./ch16/ex07/dir");
        expect(result).toBe("directory");
    });

    test("ファイルならfileを返す", async () => {
        const result = await checkEntry("./ch16/ex07/dir/dir1/file1");
        expect(result).toBe("file");
    });

    test("存在しないならnot foundを返す", async () => {
        const result = await checkEntry("path/to/unknown");
        expect(result).toBe("not found");
    });
});