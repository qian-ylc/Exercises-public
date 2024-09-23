// 補間値は一つだけ？
// string: ${}以外の部分 value: ${}で囲まれた部分
export function toTypeString(string, value) {
    console.log(value);
    let result = typeof (value);
    return result;
}