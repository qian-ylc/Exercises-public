
// 何も書かなくても大丈夫？
export class MyArrayLike {
    constructor(items) {
        this.length = items.length;
        for (let i = 0; i < items.length; i++) {
            this[i] = items[i];
        }
    }
}

export class MyArray extends Array {
    static get [Symbol.species]() { return MyArrayLike; }
    constructor(items) {
        super(...items);
    }
    // mapで戻った結果にはlengthプロパティがない? sliceはOK
    map(fn) {
        let result = super.map(fn);
        result.length = this.length;
        return result;
    }
}
