class Example {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    valueOf() {
        return this
    }
    toString() {
        return '[object Object]'
    }
}

let obj1 = new Example(1, 2)
let obj2 = new Example(1, [2])
console.log(obj1.toString())
console.log(obj1.valueOf())
console.log(obj2.toString())
console.log(obj2.valueOf())