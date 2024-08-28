import { fetchFirstFileSize, fetchSumOfFileSizes } from ".";

describe("fetchFirstFileSize", () => {
    it("最初のファイルのサイズを取得", async () => {
        let a = await fetchFirstFileSize("./ch13/ex04/testdir");
        expect(a.size).toBe(6);
    })
    it("パスが存在しない場合", async () => {
        await expect(fetchFirstFileSize("./ch13/ex04/testdir2")).rejects.toThrow();
    })
    it("ファイルが存在しない場合", async () => {
        await expect(fetchFirstFileSize("./ch13/ex04/testdirempty")).rejects.toThrow("files.length === 0");
    })
})

describe("fetchSumOfFileSizes", () => {
    it("ファイルサイズの合計を取得", async () => {
        let a = await fetchSumOfFileSizes("./ch13/ex04/testdir");
        expect(a).toBe(70);
    })
    it("パスが存在しない場合", async () => {
        await expect(fetchSumOfFileSizes("./ch13/ex04/testdir2")).rejects.toThrow();
    })
    it("ファイルが存在しない場合", async () => {
        let sum = await fetchSumOfFileSizes("./ch13/ex04/testdirempty");
        expect(sum).toBe(0);
    })
})