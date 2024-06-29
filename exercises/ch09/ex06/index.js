export class TypedMap {
    constructor(keyType, valueType, entries) {
        this.keyType = keyType;
        this.valueType = valueType;
        // entriesが指定されている場合、型をチェックする。
        if (entries) {
            for (let [k, v] of entries) {
                if (typeof k !== keyType || typeof v !== valueType) {
                    throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
                }
            }
        }
        this.map = new Map() // 委譲先となるMapオブジェクトを生成する
    }

    set(key, value) {
        // keyやvalueの型が異なっている場合は、エラーをスローする。
        if (this.keyType && typeof key !== this.keyType) {
            throw new TypeError(`${key} is not of type ${this.keyType}`);
        }
        if (this.valueType && typeof value !== this.valueType) {
            throw new TypeError(`${value} is not of type ${this.valueType}`);
        }
        return this.map.set(key, value); // 型チェックした後、委譲先のMapオブジェクトでsetメソッドを呼び出す
    }

}