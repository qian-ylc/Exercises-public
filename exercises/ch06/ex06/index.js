export function printProperty(o) {
    let ownkeys = Reflect.ownKeys(o) //全ての独自プロパティー
    let result = [...ownkeys]
    for (let key in o) { //列挙可継承プロパティー
        if (ownkeys.includes(key)) { continue }
        result.push(key)
    }
    return result
}