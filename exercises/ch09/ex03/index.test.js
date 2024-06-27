import { C, C2 } from './index'

describe('外部からフィールド x に直接アクセスできない', () => {
    test('プライベートフィールド', () => {
        const c = new C()
        expect(c.getX()).toBe(42)
        expect(c.x).toBeUndefined()
    })

    test('クロージャ', () => {
        const c2 = C2()
        expect(c2.getX()).toBe(42)
        expect(c2.x).toBeUndefined()
    })
})
