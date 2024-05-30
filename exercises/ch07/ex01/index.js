export function deterplus(a, b) {
    if (a.length !== b.length) return
    let result = []
    for (let i = 0; i < a.length; i++) {
        if (!a[i] || !b[i]) return
        result[i] = []
        for (let j = 0; j < a[0].length; j++) {
            if (!a[i][j] || !b[i][j]) return
            result[i][j] = a[i][j] + b[i][j]
        }
    }
    return result
}

export function determulti(a, b) {
    if (a[0].length != b.length) return
    let result = []
    for (let i = 0; i < a.length; i++) { // aのrow i 
        if (!a[i]) return
        result[i] = []
        for (let j = 0; j < b[i].length; j++) { // bのcol j
            if (!b[j] || a[i].length !== b.length) { return } //row iとcol jの長さが一致
            result[i][j] = 0
            for (let k = 0; k < a[i].length; k++) {
                result[i][j] += a[i][k] * b[k][j]
            }
        }
    }
    return result
}