let o = {}; // oはObject.prototypeからメソッドを継承し、
o.x = 1; // 独自プロパティxを持つ。
let p = Object.create(o); // pはoとObject.prototype からプロパティを継承し、
p.y = 2; // 独自プロパティyを持つ。
let q = Object.create(p); // qは、p、o、Object.prototypeからプロパティを継承し、
q.z = 3; // 独自プロパティzを持つ。
let f = q.toString(); // toStringはObject.prototypeから継承する。
q.x + q.y // => 3; xとyはそれぞれoとpから継承する。

console.log(o.isPrototypeOf(q))
console.log(o.isPrototypeOf(p))

console.log(Object.prototype.isPrototypeOf(Array))
console.log(Object.prototype.isPrototypeOf(Date))
console.log(Object.prototype.isPrototypeOf(Map))

