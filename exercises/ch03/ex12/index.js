let obj1 = { x: 1 }
obj1['y'] = 2

let obj2 = obj1
console.log(obj1 === obj2) //true

export function equals(obj1, obj2) {
    //キーを比較
    let keys1 = Object.keys(obj1)
    let keys2 = Object.keys(obj2)
    if (keys1.length !== keys2.length) {
        return false
    }
    for (let i = 0; i < keys1.length; i++) {
        if (keys1[i] !== keys2[i]) return false
    }

    //valueを比較
    for (let i = 0; i < keys1.length; i++) {
        //オブジェクトがある場合
        if (typeof (obj1[keys1[i]]) === "object" && typeof (obj2[keys2[i]]) === "object") {
            if (!equals(obj1[keys1[i]], obj2[keys2[i]])) return false
        } else if (obj1[keys1[i]] !== obj2[keys2[i]]) return false
    }

    return true
}

equals({ x: 1, y: 2, z: [3, 4] }, { x: 1, y: 2, z: [3, 4] })