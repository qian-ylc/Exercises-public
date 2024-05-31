// バブルソート O(n^2)
function bubblesort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = array.length - 1; j > i; j--) {
            // 隣り合う要素を比較し、大小を入れ替える
            if (array[j] < array[j - 1]) {
                let tmp = array[j]
                array[j] = array[j - 1]
                array[j - 1] = tmp
            }
        }
    }
    return array
}

// 選択ソート O(n^2)
function selectionsort(array) {
    for (let i = 0; i < array.length; i++) {
        let min = array[i]
        let k = i // 最小値の位置を記録
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < min) {
                min = array[j]
                k = j
            }
        }
        // 見つけた最小値をiの位置に移動
        let tmp = array[i]
        array[i] = array[k]
        array[k] = tmp
    }
    return array
}

// クリックソート
function quicksort(array) {
    if (array.length <= 1) {
        return array;
    }
    // 基準となる要素、その要素の左(より小さい)、その要素の右(より大きい)
    let pivot = array[Math.floor(array.length / 2)];
    let left = []
    let right = []

    // 配列の要素を左または右の配列に入れる
    for (let i = 0; i < array.length; i++) {
        if (i === Math.floor(array.length / 2)) {
            continue;
        }
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }

    // そのように得た左の配列と右の配列に対して、ソートする
    return [...quicksort(left), pivot, ...quicksort(right)];

}

export {
    bubblesort, selectionsort, quicksort
}