export async function retryWithExponentialBackoff(func, maxRetry) {
    let flag = false;
    try {
        // まずはfuncを実行、成功すればflagをtrueにして終了
        await func();
        flag = true;
        return true;
    } catch (e) {
        // 失敗したらリトライ
        while (maxRetry > 0) {
            // https://qiita.com/suin/items/99aa8641d06b5f819656 のような書き方
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, maxRetry) * 1000));
            flag = await retryWithExponentialBackoff(func, maxRetry - 1);
            if (flag === true) return true;
            maxRetry--;
        }
        flag = false;
    } finally {
        return flag;
    }
}