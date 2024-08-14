export function littleToBig(array) {
    // Uint32Array(10) [10, 1, 2, 3, 0,0, 0, 7, 0, 0]
    // [Uint8Contents]: <0a 00 00 00 01 00 00 00 02 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 07 00 00 00 00 00 00 00 00 00 00 00>
    let view = new DataView(array.buffer,
        array.byteOffset,
        array.byteLength);
    for (let i = 0; i < array.buffer.byteLength; i += 4) {
        let little = view.setUint32(i, true); // リトルエンディアンのバイト列として引数のデータを読み込み?
        view.getUint32(i, little, false);
    }
    return array
}

export function bigToLittle(array) {
    let view = new DataView(array.buffer,
        array.byteOffset,
        array.byteLength);
    for (let i = 0; i < array.buffer.byteLength; i += 4) {
        let big = view.setUint32(i, false); // ビッグエンディアンのバイト列として引数のデータを読み込み?
        view.getUint32(i, big, true);
    }
    return array
}