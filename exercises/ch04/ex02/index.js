for (let i = 1; i < 101; i++)
    console.log(i % 15 ? (i % 3 ? (i % 5 ? i : "Buzz") : "Fizz") : "FizzBuzz");

for (let i = 1; i < 101; i++) {
    if (i % 15 == 0) {
        console.log("FizzBuzz")
        // continue
    } else if (i % 3 == 0) {
        console.log("Fizz")
        // continue
    } else if (i % 5 == 0) {
        console.log("Buzz")
        // continue
    } else {
        console.log(i)
    }
}