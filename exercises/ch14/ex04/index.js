export class Hiragana {
    constructor(char) {
        this.char = char;
        this.code = char.charCodeAt(0);
    }

    // 期待される型に応じて、ひらがなまたは UTF-16 コード単位を返す
    [Symbol.toPrimitive](hint) {
        if (hint === "string") {
            return this.char;
        } else if (hint === "number") {
            return this.code;
        } else {
            return this.char;
        }
    }
}