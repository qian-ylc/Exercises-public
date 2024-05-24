const sequ = ["\u{27}", "\u{5c}", "\u{22}"] //[", \, ','/b','t',...]
// "aa\aa"のような一つバックスラッシュがある文字列は読み取れるか

export function fun1(inputString) {
    let resultString = ""
    for (let letter of inputString) {
        if (sequ.indexOf(letter) + 1) {
            letter = "\u{5c}" + letter //自動的に"\\"になったみたい 
            console.log(letter) //"\'"
        }
        resultString += letter
    }
    return resultString
}

export function fun2(inputString) {
    let resultString = ""
    for (let letter of inputString) {
        switch (letter) {
            case "\u{5c}":
                letter = "\u{5c}" + letter
                break
            case "\u{27}":
                letter = "\u{5c}" + letter
                break
            case "\u{22}":
                letter = "\u{5c}" + letter
                break
            // case "\t"
            // case "\b"
            default:
                break
        }
        resultString += letter
    }
    return resultString
}

