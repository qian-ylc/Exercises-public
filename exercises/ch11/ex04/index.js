// これから (N, K) と (K, M) の行列の乗算を行う (この値は色々変更して試すこと)
const [N, K, M] = [3, 5, 2];

// 配列版: (N, K) の行列を要素数 N * K の1次元配列で表現する ((i, j) は array[K * i + j] で参照)
const lhsA = Array(N * K).fill(0.0).map(() => Math.random());
const rhsA = Array(K * M).fill(0.0).map(() => Math.random());
const resultA = Array(N * M).fill(0.0);

function arrayMultiply() {
    resultA.fill(0.0);
    // 問題: ここで resultA に lhsA と rhsA の乗算結果を格納してね

    for (let n = 0; n < N * M; n++) { // n: resultAの要素のインデックス
        // nからresultA行列の行iと列jを求める(行iはlhsAの行に対応、列jはrhsAの列に対応)
        let i = Math.floor(n / M); // i: resultA行列の行、lhsAの行
        let j = n % M; // j: resultA行列の列、rhsAの列

        // oでlhsAの列とrhsAの行を動かしていく
        for (let o = 0; o < K; o++) { // o: lhsAの列、rhsAの行
            // debugger
            resultA[n] += lhsA[K * i + o] * rhsA[K * j + o] // (i, o) * (o, j)
        }
    }
    return resultA;
}

// 型付き配列版 (Float64Array 以外の型も試してみると良い)
const lhsB = new Float64Array(N * K).fill(0.0).map((_, i) => lhsA[i]);
const rhsB = new Float64Array(K * M).fill(0.0).map((_, i) => rhsA[i]);
const resultB = new Float64Array(N * M).fill(0.0);

function typedArrayMultiply() {
    resultB.fill(0.0);
    // 問題: ここで resultB に lhsB と rhsB の乗算結果を格納してね
    for (let n = 0; n < N * M; n++) { // n: resultBの要素のインデックス

        // nからresultB行列の行iと列jを求める(行iはlhsBの行に対応、列jはrhsBの列に対応)
        let i = Math.floor(n / M); // i: resultB行列の行、lhsBの行
        let j = n % M; // j: resultB行列の列、rhsBの列

        // oでlhsBの列とrhsBの行を動かしていく
        for (let o = 0; o < K; o++) { // o: lhsBの列、rhsBの行
            // debugger
            resultB[n] += lhsB[K * i + o] * rhsB[K * j + o] // (i, o) * (o, j)
        }
    }
    return resultB;
}

const TEST_TIMES = 100;
const TESTS = [arrayMultiply, typedArrayMultiply];
function test(fn) {
    let result;
    for (let i = 0; i < TEST_TIMES; ++i) {
        result = fn();
    }
    return result;
}

// warmup
for (let i = 0; i < TESTS.length; ++i) {
    test(TESTS[i]);
}

// 測定開始
for (let i = 0; i < TESTS.length; ++i) {
    const start = performance.now();
    test(TESTS[i]);
    const end = performance.now();
    console.log(`${TESTS[i].name}: ${end - start}`);
}

// 予測：型付き配列での乗算の方が速い。
// 実行結果：arrayMultiply: 1.0667920038104057 typedArrayMultiply: 0.46483299881219864