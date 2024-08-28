import { readdir, stat } from ".";

describe("readdir", () => {
    test("指定されたパスのファイルとフォルダ", async () => {
        let files = await readdir("./ch13/ex03");
        expect(files).toContain("index.js");
        expect(files).toContain("testdir");
    });
    test("指定されたパスのファイルとフォルダ", async () => {
        readdir("./ch13/ex03").then((files) => {
            expect(files).toContain("index.js");
            expect(files).toContain("testdir");
        });
    });
    test("指定されたパスが存在しない場合", async () => {
        let err = "[Error: ENOENT: no such file or directory, scandir \'./ch13/ex03/nottestdir\']"
        await expect(readdir("./ch13/ex03/nottestdir")).rejects.toStrictEqual(err);
    })
})

describe("stat", () => {
    test("指定されたパスのファイルの情報", async () => {
        let stats = await stat("./ch13/ex03/index.js");
        expect(stats.isFile()).toBeTruthy();
    });
    test("指定されたパスのフォルダの情報", async () => {
        let stats = await stat("./ch13/ex03/testdir");
        expect(stats.isDirectory()).toBeTruthy();
    });
    test("指定されたパスが存在しない場合", async () => {
        let err = "[Error: ENOENT: no such file or directory, stat \'./ch13/ex03/nottestdir\']"
        await expect(stat("./ch13/ex03/nottestdir")).rejects.toStrictEqual(err);
    })
})