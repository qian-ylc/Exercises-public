export function sum(array) {
    if (!array) return 0
    return array.reduce((x, y) => x + y, 0)
}

export function join(array, s = "") {
    if (!array) throw Error()
    if (!array[0]) array[0] = ""
    const joinWiths = (x, y) => "" + x + s + y
    array.forEach((x, i) => {
        if (x === null) {
            array[i] = ",,"
        }
    });
    return array.reduce(joinWiths)
}

export function reverse(array) {
    if (!array) throw Error()
    return array.reduce((x, y) => [y, ...x], []) // []?
}

export function every(array, fun) {
    let flag = true
    array.forEach((element, index, array) => {
        if (!fun(element, index, array)) { flag = false }
    }) // forEachでは処理の中でreturnしても、forEach文を抜けることは出来ない
    return flag
}

export function some(array, fun) {
    let flag = false
    array.forEach((element, index, array) => {
        if (fun(element, index, array)) { flag = true }
    })
    return flag
}