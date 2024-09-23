export class IgnoreAccentPattern {
    constructor(pattern) {
        this.pattern = pattern;
        // まず正規化、そしてアクセント記号を削除
        // pattern.source: 正規表現のパターン文字列を返す
        if (pattern instanceof RegExp) {
            let regexpText = pattern.source.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            // 入力された正規表現のフラグをそのまま使う
            this.regexp = new RegExp(`${regexpText}`, pattern.flags);
        } else {
            let regexpText = pattern.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            this.regexp = new RegExp(`${regexpText}`);
        }

    }

    toString() { return this.pattern; }

    [Symbol.search](s) {
        s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        console.log(s, this.regexp)
        return s.search(this.regexp);
    }
    [Symbol.match](s) {
        s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return s.match(this.regexp);
    }

}