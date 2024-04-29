function fun() {
    const j = 50
    const i = 100
    if (j < i) { const i = 60 }
    return i
}

console.log(fun()) //100

