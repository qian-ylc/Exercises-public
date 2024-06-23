function fizzbuzz(n) {
    let array = new Array(n).fill(0)
    array = array.map((x, i) => x + i + 1)
    // a.mapで入れ替え
    array.forEach(i => {
        i % 15 === 0 ? console.log("FizzBuzz") :
            i % 5 === 0 ? console.log("Fizz") : i % 3 === 0 ?
                console.log("Buzz") : console.log(i)
    });
}

function sumOfSquaredDifference(f, g) {
    result = new Array(f.length).fill(0)
    result = result.map((x, i) => (f[i] - g[i]) ** 2)
    return result.reduce((x, y) => x + y)
}

function sumOfEvensIsLargerThan42(array) {
    let evenArray = array.filter((x, i) => i % 2 === 0)
    let sum = evenArray.reduce((x, y) => x + y)
    return sum >= 42
}
