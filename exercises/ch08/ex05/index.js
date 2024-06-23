export function sequenceToObject(...values) {
    let odd = [] // key
    let even = [] // value
    let result = {}
    if (values.length % 2 !== 0) {
        throw new Error("値の個数の合計が偶数ではない")
    }
    values.forEach((element, index) => {
        let num = index + 1 // indexは0から始めるため
        // keyをoddに, valueをevenに
        if (num % 2 !== 0) {
            if (typeof (element) !== 'string') {
                throw new Error("奇数番の値が string でない");
            }
            odd.push(element)
        } else {
            even.push(element)
        }
    })
    odd.forEach((key, index) => {
        result[key] = even[index]
    })
    return result
}