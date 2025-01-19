// let a, x, y;
const r = 10;
//  4:1  error  Parsing error: 'with' in strict mode
//  9:1  error  'a' is never reassigned. Use 'const' instead
// with (Math) {
//     a = PI * r * r;
//     x = r * cos(PI);
//     y = r * sin(PI / 2);
// }
const a = Math.PI * r * r;
const x = r * Math.cos(Math.PI);
const y = r * Math.sin(Math.PI / 2);

console.log(a, x, y);
