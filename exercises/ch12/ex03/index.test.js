import { counterGen } from ".";

describe("counterGen", () => {
    it("カウントをリセット", () => {
        let gen = counterGen();
        expect(gen.next().value).toBe(1);
        expect(gen.next().value).toBe(2);
        expect(gen.next().value).toBe(3);
        gen.throw("aaa");
        expect(gen.next().value).toBe(1)
        /*
        let gen = counterGen();
        gen.throw("aaa");
        gen.next() // =>  { value: undefined, done: true }
        */
    })
})