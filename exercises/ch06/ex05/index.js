let o1 = { x: 1, y: 2, "1": 3 }
let o2 = Object.create(o1)
o2.z = 4
o2["-1"] = 5
o2.x = 10
Object.defineProperty(o2, 'y', {
    value: 20,
    enumerable: false
})

for (let object in o1) {
    console.log(object)
} // 1, x, y
for (let object in o2) {
    console.log(object)
} // z, -1, x, 1 継承プロパティあり、列挙不可プロパティなし



