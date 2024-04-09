import { CRLFtoLF, LFtoCRLF } from ".";

describe("改行の置き換え", () => {
    it("CRLF to LF", async () => {
        expect(CRLFtoLF("Hello, World\r\n")).toBe("Hello, World\n");
    });
    it("LF to CRLF", async () => {
        expect(LFtoCRLF("Hello, World\n")).toBe("Hello, World\r\n");
    });
});