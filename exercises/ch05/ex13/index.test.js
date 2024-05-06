import { fib } from ".";

describe('ジェネレーター関数でのフィボナッチ', () => {
    const a = fib()
    it('第1項は1', () => {
        expect(a.next().value).toBe(1)
    })
    it('第2項は1', () => {
        expect(a.next().value).toBe(1)
    })
    it('第3項は2', () => {
        expect(a.next().value).toBe(2)
    })
    it('第10項は55', () => {
        for (let i = 4; i < 10; i++) {
            a.next()
        }
        expect(a.next().value).toBe(55)
    })
    it('第75項は2111485077978050', () => {
        for (let i = 11; i < 75; i++) {
            a.next()
        }
        expect(a.next().value).toBe(2111485077978050)
    })
})