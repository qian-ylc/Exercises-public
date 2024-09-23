import { logProxy } from ".";

describe("logProxy", () => {
    test("logProxy", () => {
        let obj = {
            add(a, b) {
                return a + b;
            },
            sub(a, b) {
                return a - b;
            }
        };
        let { proxy, log } = logProxy(obj);
        expect(proxy.add(1, 2)).toBe(3);
        expect(proxy.sub(3, 2)).toBe(1);
        expect(log).toEqual([
            {
                timestamp: expect.any(Date),
                method: "add",
                parameters: [1, 2]
            },
            {
                timestamp: expect.any(Date),
                method: "sub",
                parameters: [3, 2]
            }
        ]);
    });
});