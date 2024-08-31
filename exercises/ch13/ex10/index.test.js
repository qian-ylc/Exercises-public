import { fetchSumOfFileSizes } from ".";

describe("fetchSumOfFileSizes", () => {
    it("ファイルサイズの合計を取得", async () => {
        // もう一つの書き方
        await expect(fetchSumOfFileSizes("./ch13/ex08/testdir")).resolves.toBe(70);
    })
    it("パスが存在しない場合", async () => {
        await expect(fetchSumOfFileSizes("./ch13/ex08/testdir2")).rejects.toThrow();
    })
    it("ファイルが存在しない場合", async () => {
        await expect(fetchSumOfFileSizes("./ch13/ex08/testdirempty")).resolves.toBe(0);
    })
})