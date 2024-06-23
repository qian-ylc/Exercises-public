export const f = (fun) => {
    // returnがない関数にreturnを追加
    if (!fun.includes("return")) {
        fun = "return " + fun
    }
    // 最後に関数本体を指定
    return new Function("$1", "$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$10", fun)
}