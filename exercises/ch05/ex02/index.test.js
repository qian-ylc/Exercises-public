import { fun1, fun2 } from ".";

describe("エスケープシーケンス if/else", () => {
    it("aaaaa", async () => {
        expect(fun1("aaaaa")).toBe("aaaaa");
    })
    it("aa'aa", async () => {
        expect(fun1("aa'aa")).toBe("aa\'aa");
    })
    it("aa\aa", async () => {
        expect(fun1("aa\aa")).toBe("aa\aa"); //自動的に"aaaa"に変換される？
    })
})

describe("エスケープシーケンス switch", () => {
    it("aaaaa", async () => {
        expect(fun2("aaaaa")).toBe("aaaaa");
    })
    it("aa'aa", async () => {
        expect(fun2("aa'aa")).toBe("aa\'aa");
    })
    it("aa\aa", async () => {
        expect(fun2("aa\aa")).toBe("aa\aa");
    })
})