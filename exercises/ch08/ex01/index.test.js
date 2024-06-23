import { a, b, c } from './index.js'

describe("アロー関数", () => {
    it('1', () => {
        expect(a(5, "a")).toStrictEqual(['a', 'a', 'a', 'a', 'a'])
        expect(a(4, 0)).toStrictEqual([0, 0, 0, 0])
        expect(a(3)).toStrictEqual([undefined, undefined, undefined])
    })
    it('2', () => {
        expect(b(3)).toBe(9)
        expect(b(-3)).toBe(9)
        expect(b(0)).toBe(0)
    })
    it('3', () => {
        expect(c()).toStrictEqual({ now: new Date() })
    })
})