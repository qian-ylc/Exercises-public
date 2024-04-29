fun: for (let i = 1; i < 10; i++) {
    for (let j = 1; j < 10; j++) {
        if (j > i) { break fun }
        console.log("j" + j)
    }
    console.log("i" + i)
}