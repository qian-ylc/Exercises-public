import { exp1, exp2, exp3 } from ".";

describe('べき乗', () => {
    it('再帰', () => {
        expect(exp1(2, 0)).toBe(1)
        expect(exp1(2, 1)).toBe(2)
        expect(exp1(2, 5)).toBe(32)
        expect(exp1(-2, 4)).toBe(16)
        expect(exp1(-2, 5)).toBe(-32)
    })
    it('ループ', () => {
        expect(exp2(2, 0)).toBe(1)
        expect(exp2(2, 1)).toBe(2)
        expect(exp2(2, 5)).toBe(32)
        expect(exp2(-2, 4)).toBe(16)
        expect(exp2(-2, 5)).toBe(-32)
    })
    it('高速化再帰', () => {
        expect(exp3(2, 0)).toBe(1)
        expect(exp3(2, 1)).toBe(2)
        expect(exp3(2, 5)).toBe(32)
        expect(exp3(-2, 4)).toBe(16)
        expect(exp3(-2, 5)).toBe(-32)
    })
})