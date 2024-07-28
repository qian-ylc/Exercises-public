export function retryWithExponentialBackoff(func, maxRetry, callback) {
    let flag = false // flagで結果を記録
    try {
        func();
        flag = true;
        return true; // funcがtrueを返せばそこで終了する
    } catch (e) {
        // リトライ中trueを返せば、そこで終了する書き方？
        while (maxRetry > 0) {
            setTimeout(() => {
                flag = retryWithExponentialBackoff(func, maxRetry - 1, callback);
            }, Math.pow(2, maxRetry) * 1000); // flagでリトライの結果を取得
            // console.log(maxRetry, flag)
            if (flag === true) return true; // funcがtrueを返せばそこで終了する？
            maxRetry--;
        }
        flag = false // リトライ回数を使い切ったらfalseを返す
    } finally {
        callback(flag);
    }
}