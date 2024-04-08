const c = a 
++b 
// c=a c=0 ++b b=1

console.log(a, b, c); // (0,1,0)

const e = a++ //e=0 a=1
b //b=1

console.log(a, b, e); // (1,1,0)