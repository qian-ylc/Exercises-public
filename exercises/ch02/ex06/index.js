export const fizzbuzz = () => { let result = ""; for (let i = 1; i <= 100; i++) { i % 15 === 0 ? result += "FizzBuzz\n" : i % 5 === 0 ? result += "Buzz\n" : i % 3 === 0 ? result += "Fizz\n" : result += i + "\n" } return result }