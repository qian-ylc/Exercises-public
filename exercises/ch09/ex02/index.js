export class C {
    constructor() {
        this.n = 0
        // xにするとTypeError: Cannot set property x of #<C> which has only a getter
    }

    get x() { // getterを使って, c.xをするたびにn++をする
        return this.n++;
    }
}
