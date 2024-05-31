function pushfun(seq, x) {
    if (!seq) return
    return [...seq, x]
}

function popfun(seq) {
    if (!seq) return
    if (seq.length === 0) return []
    return seq.slice(0, -1)
}

function shiftfun(seq, x) {
    if (!seq) return
    return [x, ...seq]
}

function unshiftfun(seq) {
    if (!seq) return
    if (seq.length === 0) return []
    return seq.slice(1)
}

function sortfun(seq) {
    if (!seq) return
    if (seq.length === 0) return []

    let seq2 = Array.from(seq)
    for (let i = 0; i < seq2.length; i++) {
        for (let j = seq2.length - 1; j > i; j--) {
            // 隣り合う要素を比較し、大小を入れ替える
            if (seq2[j] < seq2[j - 1]) {
                let tmp = seq2[j]
                seq2[j] = seq2[j - 1]
                seq2[j - 1] = tmp
            }
        }
    }
    return seq2
}

export { popfun, pushfun, shiftfun, unshiftfun, sortfun }