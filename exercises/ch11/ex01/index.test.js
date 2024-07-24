import { TypeMap } from './index';

describe('TypeMap', () => {
    test('TypeMapの初期化', () => {
        const typeMap = new TypeMap();
        expect(typeMap.size).toBe(0);
    });

    test('TypeMapのsetとget', () => {
        class Foo { }
        let typeMap = new TypeMap();
        typeMap.set(String, "string");
        typeMap.set(Number, 123);
        typeMap.set(Foo, new Foo());
        expect(typeMap.get(String)).toBe('string');
        expect(typeMap.get(Number)).toBe(123);
        expect(typeMap.get(Foo)).toBeInstanceOf(Foo);
    });

    test('valueがkeyのクラスではない場合', () => {
        let typeMap = new TypeMap();
        expect(() => typeMap.set(String, 123)).toThrow('型が違う');
    });

    test('keyがコンストラクタ関数でない場合', () => {
        let typeMap = new TypeMap();
        expect(() => typeMap.set("String", "string")).toThrow('コンストラクタ関数が必要');
    });
});