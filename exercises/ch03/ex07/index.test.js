import { equalArrays } from ".";
describe("equalArrays", () => {
    it("値が明らかに違うのに true と返してしまう", async () => {
        expect(equalArrays(" ", " ")).toBe(true);
    });
});