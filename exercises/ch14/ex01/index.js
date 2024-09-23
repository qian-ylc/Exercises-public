export function unwritableAndUnconfigurableObj() {
    let o = Object.defineProperties({}, {
        a: { value: 1, writable: false, enumerable: true, configurable: false },
    })
    Object.freeze(o);
    return o;
}

export function writableAndUnconfigurableObj() {
    let o = Object.defineProperties({}, {
        b: { value: 2, writable: true, enumerable: true, configurable: false },
    })
    Object.seal(o);
    return o;
}

// ネストされたオブジェクトにも、sealする必要がある？
export function nestedUnwritableObj() {
    let o = Object.defineProperties({}, {
        c: {
            value: Object.seal(Object.defineProperties({}, {
                d: {
                    value: Object.seal(Object.defineProperties({}, {
                        e: { value: 3, writable: true, enumerable: true, configurable: false },
                    })),
                    writable: true,
                    enumerable: true,
                    configurable: false,
                },
            })),
            writable: true,
            enumerable: true,
            configurable: false,
        },
    });
    Object.seal(o);
    return o;
}
