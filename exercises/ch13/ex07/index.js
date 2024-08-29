function wait(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
}

const wait0 = () => wait(0);
const wait1 = () => wait(1000);
const wait2 = () => wait(2000);
const wait3 = () => wait(3000);

const log = (v) => console.log(v);
const logA = (v) => console.log("A");
const logB = (v) => console.log("B");
const logC = (v) => console.log("C");

const errX = () => {
    throw new Error("X");
};
const errY = () => {
    throw new Error("Y");
};

// 回答
//  wait3
// |---------------|
//                 logA
//                 |-|
//                    wait2
//                    |----------|
//                               logB
//                               |-|
//                                  wait1
//                                 |-----|
//                                        logC
//                                        |-|
// 説明: await wait3()で、3秒待ってからlogA()が出力される
async function h1() {
    try {
        await wait3();
        logA();
        await wait2();
        logB();
        await wait1();
        logC();
    } catch (e) {
        log(e.message);
    }
}

function h2() {
    // NOTE: h3 との比較用
    // 回答: すぐに X が出力される
    // 説明: new PromiseにエラーXが発生すると、catchでエラーXのエラーメッセージが出力される f11()と同じ？
    new Promise(() => {
        errX();
    }).catch((e) => log(e));
}

function h3() {
    // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
    // 回答: エラーXがスローされる
    // 説明: h2()にはnew Promiseの中は同期関数で、errX()が呼ばれるとすぐに例外がスローされてキャッチされる
    // h3()にはasyncで、戻り値がPromiseになる。errX()が例外をスローするとPromiseはこの例外で失敗する
    new Promise(async () => {
        errX();
    }).catch((e) => log(e.message));
}

async function h4() {
    // NOTE: 2つの例外は両方 catch できるか？
    // 回答: エラーYがスローされた（キャッチされなかった）だけ
    // 説明: awaitはプログラムをプロックしない。await p1の後にすぐにawait p2が実行される
    // 1秒後にp2が解決され、errY()が実行されるが -> キャッチできなかった？
    try {
        const p1 = wait2().then(() => {
            errX();
        });
        const p2 = wait1().then(() => {
            errY();
        });
        await p1;
        await p2;
    } catch (e) {
        log(e.message);
    }
}

