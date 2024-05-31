console.log("𠮷野家"[0]) => '\ud842'\
console.log("👨‍👨‍👧‍👧"[0]) => '\ud83d'


https://www.buildinsider.net/language/csharpunicode/01 より、\
「ユーザーが1文字として認識する単位を書記素（grapheme）といい、書記素を構成する複数のコードポイントを書記素クラスター（grapheme cluster）と呼ぶ」\
"𠮷"のUnicodeエスケープシーケンスは'\ud842\udfb7'、"𠮷"が一つの書記素クラスターで、'\ud842'と'\udfb7'で構成される。\
そこで、書記素で分割すると"[ '𠮷', '野', '家' ]になったが、
配列で出力すると'\ud842'となった。

👨‍👨‍👧‍👧が一つの書記素クラスターで、Unicodeエスケープシーケンスは'\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc67'となる。
\u200dは二つの絵文字を繋げるゼロ幅接合子である。
- 👨‍: '\ud83d\udc68'
- 👧‍: '\ud83d\udc67'
- 👨‍👨‍👧‍👧 = 👨 + 👨 + 👧 + 👧


