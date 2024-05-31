console.log("𠮷野家"[0]) // '\ud842'
console.log("👨‍👨‍👧‍👧"[0]) // '\ud83d'

/* "𠮷"のUnicodeエスケープシーケンスは'\ud842\udfb7'
https://www.buildinsider.net/language/csharpunicode/01 より、
「」
*/


let segmenterJa = new Intl.Segmenter("ja-JP", { granularity: "grapheme" });
let segments = segmenterJa.segment("𠮷野家")
let array = Array.from(segments)
console.log(array) // [ { segment: '\ud842', index: 0, input: '\ud842' } ]


segments = segmenterJa.segment("👨‍👨‍👧‍👧")
array = Array.from(segments)
console.log(array) // [ { segment: '\ud842', index: 0, input: '\ud842' } ]
