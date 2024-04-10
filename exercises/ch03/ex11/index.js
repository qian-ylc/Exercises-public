let sample = "aaaaabbbb"
let a = Symbol(sample)
let b = Symbol(sample)
let o = {}
o[a] = 1
o[b] = 2
console.log(o[a])
console.log(o[b])

let sample2 = "aaaaabbbb"
let a2 = Symbol.for(sample)
let b2 = Symbol.for(sample) // a===b false a2===b2 true
let o2 = {}
o2[a2] = 1
o2[b2] = 2
console.log(o[a2])
console.log(o[b2])
