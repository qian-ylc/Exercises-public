class complex {
    constructor(re, im) {
        this.re = re
        this.im = im
    }
}

let add = function (a, b) {
    let c = new complex(0, 0)
    c.re = a.re + b.re
    c.im = a.im + b.im
    return c
}

let sub = function (a, b) {
    let c = new complex(0, 0)
    c.re = a.re - b.re
    c.im = a.im - b.im
    return c
}

let mul = function (a, b) {
    let c = new complex(0, 0)
    c.re = a.re * b.re - a.im * b.im
    c.im = a.im * b.re + a.re * b.im
    return c
}

let div = function (a, b) {
    let c = new complex(0, 0)
    c.re = (a.re * b.re + a.im * b.im) / (b.re ** 2 + b.im ** 2)
    c.im = (a.im * b.re - a.re * b.im) / (b.re ** 2 + b.im ** 2)
    return c
}

export { complex, add, sub, mul, div }