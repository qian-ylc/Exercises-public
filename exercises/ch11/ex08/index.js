let reg = new RegExp(/^(a|aa)+$/);
let a = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!"

let start = performance.now();
reg.test(a);
let end = performance.now();
console.log(`Time: ${end - start}ms`); // Time: 117909.75504199998ms