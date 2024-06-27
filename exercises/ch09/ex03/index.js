export class C {
    #x = 42
    getX() {
        return this.#x
    }
}

export function C2() {
    let x = 42
    return {
        getX: function () {
            return x
        }
    }
}