function fun1(x) {
    try {
        console.log("try")
        if (isNaN(Math.abs(x))) {
            throw new Error("error")
        }

        if (Math.abs(x) > 10) {
            console.log("output=", x)
            return x
        }
        x = Math.pow(x, 2)
        console.log("output=", x)
        return x
    } catch (e) {
        console.log("catch")

    } finally {
        console.log("finally")
        console.log("\n")
    }
}

fun1(40) // try output=40 finally
fun1(4) //try output=16 finally
fun1("aaa") //try catch finally
fun1() //try catch finallu