// 文字列中の大文字・小文字("つ"と"っ"等)、濁点・半濁点("は"と"ば"と"ば"等)の違いを無視してソート
// sensitivity: base
export function sortJapanese(array) {
    const collator = new Intl.Collator(undefined, {
        sensitivity: "base",
        ignorePunctuation: true
    }).compare;
    return array.sort(collator);
}

// Intl.DateTimeFormat
// no weekdays ロケールに-u-ca-をつける
export function toJapaneseDateString(date) {
    let opts = { month: "long", year: "numeric", era: "long", day: "numeric" };
    return new Intl.DateTimeFormat("ja-JP-u-ca-japanese", opts).format(date);
}