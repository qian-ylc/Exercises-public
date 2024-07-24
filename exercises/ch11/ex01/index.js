class TypeMap extends Map {
    constructor() {
        super();
    }
    get(key) {
        return super.get(key);
    }
    set(key, value) {
        if (typeof (key) !== 'function') {
            throw new Error('コンストラクタ関数が必要');
        }

        let toString = Object.prototype.toString
        // https://qiita.com/south37/items/c8d20a069fcbfe4fce85
        // toString.call("111") => '[object String]' keyがラッパークラスの場合、valueがふさわしいかどうかを判定
        if (toString.call(value).includes(key.name) || value instanceof key) {
            return super.set(key, value);
        } else {
            throw new Error('型が違う');
        }
    }
}

export { TypeMap };