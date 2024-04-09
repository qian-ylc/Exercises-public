describe("エスケープシーケンス", () => {
    it("💯", async () => {
        expect("💯".length).toBe(2);
    });
    it("\uD83D\uDCAF", async () => {
        expect("\uD83D\uDCAF" === "\u{0001F4AF}").toBe(true);
    });
});