let o1 = { x: 1, y: 2 }
let o2 = Object.create(o1)
o2.z = 3
console.log(o2) //{z:3}
console.log(Object.getPrototypeOf(o2)) //{ x: 1, y: 2 }