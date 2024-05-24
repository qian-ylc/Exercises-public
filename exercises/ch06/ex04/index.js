let o = { x: 1, y: 2, z: 3 }
Object.defineProperties(o, {
    x: {
        writable: false
    },
    y: {
        configurable: false
    },
    z: {
        enumerable: false
    }
})

try {
    o.x = 10 // TypeError: Cannot assign to read only property 'x' of object '#<Object>'
} catch (e) {
    console.log(o.x) // 1
}

try {
    delete o.y // TypeError: Cannot delete property 'y' of #<Object>
} catch (e) {
    console.log(o)
}

console.log(o) // {x:1, y:2} zが列挙に現れない
console.log(o.propertyIsEnumerable('x')) // true
console.log(o.propertyIsEnumerable('z')) // false
