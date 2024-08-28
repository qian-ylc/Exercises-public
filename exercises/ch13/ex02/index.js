function f1() {
    // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
    //
    // 回答:
    // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
    //
    // 説明:
    // wait3 の解決後に logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されるため。
    //
    // 図解:
    //  wait3
    // |---------------|
    //                  logA
    //                 |-|
    //                    wait2
    //                   |----------|
    //                               logB
    //                              |-|
    //                                 wait1
    //                                |-----|
    //                                       logC
    //                                      |-|
    wait3()
        .then(logA)
        .then(() => wait2().then(logB))
        .then(() => wait1().then(logC));
}

function f2() {
    // NOTE: 2つ目の then の中で return が無くなっていることに注意 (典型的なミス)
    //
    // 解答例:
    // 3秒後に A が出力され、その1秒後に C が出力され、その1秒後に B が出力される。
    // 2つ目の .then のコールバック関数が値を return していないため、この .then が返す Promise は即解決される。
    // このため logA() の実行すぐ後に wait1().then(...) が実行され C が先に出力される。
    //
    // 図解:
    //  wait3
    // |---------------|
    //                  logA
    //                 |-|
    //                    wait2
    //                   |----------|
    //                               logB
    //                              |-|
    //                  wait1
    //                 |-----|
    //                        logC
    //                       |-|
    wait3()
        .then(logA)
        .then(() => {
            wait2().then(logB);
        })
        .then(() => wait1().then(logC));
}

function f3() {
    // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか

    // 回答:
    // すぐにCが出力され、その後Aが出力され、最後にエラーXが出力される。

    // 説明:
    // try/catchは非同期のコードでは動作しないため、logB()は出力されない
    // wait(0).then(logA).then(errX)が非同期なチェーンなので、まずはfinallyのlogCが出力される
    // その後、wait(0)のPromiseが解決され、logAが出力される
    // そして、errXでエラーが発生する

    try {
        wait(0).then(logA).then(errX);
    } catch (e) {
        logB();
    } finally {
        logC();
    }
}

function f4() {
    // NOTE: f5 との比較用

    // 回答: 2秒後に A が出力され、その1秒後に B が出力され、その後すぐに100 が出力される。
    // まずは2秒でwait2()が解決され、logA()が出力される
    // その後、1秒でwait(1000)が解決され、logB()が出力される。return 100 で次のthenに渡される
    // 最後に100が出力される

    wait2()
        .then(() => {
            logA();
            return 40;
        })
        .then((value) =>
            wait(1000).then(() => {
                logB();
                return 100;
            })
        )
        .then((v) => log(v));
}

function f5() {
    // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)

    // 回答: 1秒後に B が出力され、その1秒後に A が出力され、その後すぐに 100 が出力される
    // 説明: 2つ目のthenの引数が関数でなくPromiseになっているため、wait1().then(...)が即実行されて、１秒後にBが出力される
    // その後1秒後、wait2()が解決されlogA()が出力されて、その後すぐに100が出力される
    wait2()
        .then(() => {
            logA();
            return 40;
        })
        .then(
            wait1().then(() => {
                logB();
                return 100;
            })
        )
        .then((v) => log(v));
}

function f6() {
    // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか

    // 回答: 1秒後に A が出力され、その1秒後に B が出力され、その1秒後に C が出力される
    // 説明: const p = wait1().then(logA)には、1秒でwait1()が解決されてlogA()が出力される
    // その後、二つのthen()チェーンが独立で実行される
    //  wait1
    // |-----|
    //       logA
    //       |-|
    //          wait1
    //          |-----|
    //                 logB
    //                 |-|
    //          wait2
    //          |----------|
    //                      logC
    //                      |-|

    const p = wait1().then(logA);
    p.then(() => wait1()).then(logB);
    p.then(() => wait2()).then(logC);
}

function f7() {
    // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
    // (= 解決済みの Promise の then を呼び出すとどうなるか)

    // 回答: 1秒後に A が出力され、その1秒後に B が出力されてすぐに C が出力される
    //  wait1
    // |-----|
    //       logA
    //       |-|
    //  wait2
    //  |----------|
    //              logB
    //              |-|
    //              logC
    //              |-|
    // 説明: const p = wait1().then(logA)には、1秒でwait1()が解決されてlogA()が出力される
    // pの解決を待たずにwait2()が実行され、2秒待ってreturn p.then(logB)が実行される
    // この時はpは解決済みなので、すぐにlogB()が出力される、最後にlogC()が出力される
    const p = wait1().then(logA);
    wait2()
        .then(() => {
            return p.then(logB);
        })
        .then(logC);
}

function f8() {
    // NOTE: f9, f10 との比較用

    // 回答: 1秒後に エラーX が出力され、その後すぐに A が出力される
    // 説明: wait1()がまず解決され、errX()が実行されるとcatchでエラーXが出力される
    // 最後にfinallyのlogAが出力される
    // then(errY)は実行されない

    wait1()
        .then(errX)
        .then(errY)
        .catch((e) => log(e.message))
        .finally(logA);
}

function f9() {
    // NOTE: f12 との比較用

    // 回答: 1秒後に エラーY が出力され、その後すぐに A が出力される
    // 説明: wait1()がまず解決され、errY()が実行されるとcatchでエラーYが出力される
    // 最後にfinallyのlogAが出力される
    wait1()
        .then(() => 42)
        .then(errY)
        .catch((e) => log(e.message))
        .finally(logA);
}

function f10() {
    // NOTE: then(r, c) と then(r).catch(c) は等しいか？

    // 回答: 1秒後に A が出力され、その後すぐに エラーY が出力される
    // 説明: wait1()がまず解決される。
    // Promise が完了したときに、finally() に渡されたコールバックが呼び出される
    // ここでは、.finally(logA)はwait1()のPromiseに対する？
    // ので、先にlogAが出力され、そして.then(errY, (e) => log(e.message))で(errY)のエラーをcatchしてエラーYを出力する
    wait1()
        .then(() => 42)
        .then(errY, (e) => log(e.message))
        .finally(logA);
}

function f11() {
    // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？

    // 回答: すぐに X が出力される
    // 説明: new PromiseにエラーXが発生すると、catchでエラーXが出力される
    new Promise((resolve, reject) => {
        errX();
    }).catch((e) => log(e.message));
}

function f12() {
    // new Promise 内だがコールバック関数で throw した場合は？

    // 回答: すぐに　エラーX がスローされる（キャッチされなかった）
    // 説明: .catch()はPromiseに対する処理で、new Promise 内のコールバック関数内で発生したエラーはキャッチされない
    new Promise((resolve, reject) => {
        setTimeout(() => errX(), 0);
    }).catch((e) => log(e.message));
}
