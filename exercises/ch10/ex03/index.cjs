const Point = require('./point.cjs');

// 座標点を作成
const p1 = new Point(10, 20);
const p2 = new Point(30, 40);
console.log(p1.plus(p2)); // Point { x: 40, y: 60 }
console.log(p1.minus(p2)); // Point { x: -20, y: -20 }