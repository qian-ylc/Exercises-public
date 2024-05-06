//withの場合
let a = { "x": 5, "y": 6, "z": { "a": 2, "b": 3, "c": 4 } }
let start = performance.now()
with (a.z) {
    console.log(a)
    console.log(b)
    console.log(c)
    let end = performance.now()
    console.log("use with: " + (end - start))
}

//with使用しない場合
start = performance.now()
console.log(a.z.a)
console.log(a.z.b)
console.log(a.z.c)
let end = performance.now()
console.log("do not use with: " + (end - start))
