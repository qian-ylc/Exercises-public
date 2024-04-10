export function equalArrays(a, b) {
    if (a === b) return true; // 同一の配列は等しい。
    if (a.length !== b.length) return false; // 長さの異なる配列は等しくない。
    for (let i = 0; i < a.length; i++) { // すべての要素を巡回する。
        if (a[i] !== b[i]) return false; // 1つでも違っていれば、等しくない。
    }
    return true; // すべて同じであれば、等しい。
}