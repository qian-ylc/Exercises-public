class C {
    constructor() {
        this.C = {
            method() {
                return 5
            }
        }
    }
    static method() { // Cの静的メソッド
        return 1
    }

    method() { // Cのインスタンスのメソッド
        return 2
    }

    static C = { // クラスCにはCという静的フィールドがあって、その中には静的メソッドmethodがある
        method() {
            return 3
        }
    }

    C() {

    }

}


export { C }