// npx jest ch12/ex06/index.test.js

describe("walk", () => {
    const { walk } = require("./index.js");

    it("testフォルダを探索", () => {
        let rootPath = "ch12/ex06/test"
        let walker = walk(rootPath);
        expect(walker.next().value).toBe('{ path: "ch12/ex06/test/test2", isDirectory: true }');
        expect(walker.next().value).toBe('{ path: "ch12/ex06/test/test2/testfile1.md", isDirectory: false }');
        expect(walker.next().value).toBe('{ path: "ch12/ex06/test/test2/testfile2.js", isDirectory: false }');
        expect(walker.next().value).toBe('{ path: "ch12/ex06/test/test3", isDirectory: true }');
        expect(walker.next().value).toBe('{ path: "ch12/ex06/test/test3/testfile3.md", isDirectory: false }');
        expect(walker.next().done).toBe(true);
    })
    it("空フォルダの場合", () => {
        let rootPath = "ch12/ex06/testEmpty"
        let walker = walk(rootPath);
        expect(walker.next().value).toBe(undefined);
        expect(walker.next().done).toBe(true);
    })
    it("存在しないフォルダの場合", () => { // catch
        let rootPath = "ch12/ex06/testEmp"
        let walker = walk(rootPath);
        expect(walker.next().value).toBe(false); // return false => value: false done: true
        expect(walker.next().done).toBe(true);
    })
})