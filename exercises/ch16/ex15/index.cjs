const threads = require('worker_threads');

if (threads.isMainThread) {
    // sharedArray を number 型の変数 num にする
    let num = new Number(0);
    let worker = new threads.Worker(__filename, { workerData: num });
    worker.on('online', () => {
        // メインスレッドの for ループで Atomic.add の代わりに num をインクリメントする
        for (let i = 0; i < 10_000_000; i++) {
            num++;
        }
        worker.on('message', () => {
            num++;
            if (num % 1000000 === 0) {
                console.log(num);
            }
        })
    })
} else {
    // メインスレッドに"num をインクリメントせよ"というメッセージを送り
    for (let i = 0; i < 10_000_000; i++) {
        threads.parentPort.postMessage("increase num");
    }

}