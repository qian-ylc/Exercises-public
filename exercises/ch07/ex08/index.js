export function reverse(s) {
    let segmenterJa = new Intl.Segmenter("ja-JP", { granularity: "grapheme" });
    let segments = segmenterJa.segment(s)
    let array = Array.from(segments)
    array = array.map(elem => elem.segment)
    let result = array.reverse().join("")
    return result

}