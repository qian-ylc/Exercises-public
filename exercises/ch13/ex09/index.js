function wait(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
}

const wait0 = () => wait(0);
const wait1 = () => wait(1000);
const wait2 = () => wait(2000);
const wait3 = () => wait(3000);
const wait5 = () => wait(5000);
const wait10 = () => wait(10000);

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

async function i1() {
    // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
    // 回答: 1秒後に 42 が出力される、その後 2秒待って 100 が出力される
    // 説明: any で最初に解決された Promise が wait1().then(() => 42) の42なので、vに42が代入される
    // Promise.any は並列処理で、初めから2秒後に、vが100に更新される

    // Promise.any()のwait1
    // |-----|
    //        log(v) 42         
    //        |-|         
    //  Promise.any()のwait2                  
    // |----------|v = 100
    //           await wait2()                     
    //        |----------|                    
    //                    log(v) 100           
    //                    |-|           

    let v = 0;

    v = await Promise.any([
        wait1().then(() => 42),
        wait2()
            .then(() => (v = 100))
            .then(() => 0),
    ]);
    log(v);
    await wait2();
    log(v);
}

async function i2() {
    // 回答
    // 1秒後に C が出力される、その後 1秒後に B が出力され、その後 1秒後に A が出力される
    // 最後に ["A", "B", "C"] が出力される
    // Promise.all()のwait1
    // |-----|
    //       logC
    //       |-|
    // Promise.all()のwait2
    // |----------|
    //            logB
    //            |-|
    // Promise.all()のwait3 vが解決される
    // |---------------|
    //                 logA
    //                 |-|
    //                    log(v) ["A", "B", "C"]
    //log(v)の中身は、Promise.all()の中の順番で格納
    const v = await Promise.all([
        wait3().then(() => {
            logA();
            return "A";
        }),
        wait2().then(() => {
            logB();
            return "B";
        }),
        wait1().then(() => {
            logC();
            return "C";
        }),
    ]);
    log(v);
}

async function i3() {
    // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
    // 回答
    // wait1()
    // |-----|
    //        log(e.message) Y
    //        |-|
    //        v =42
    //        |-|
    // wait2()
    // |----------|
    //            logB
    //            |-|
    // wait3()
    // |---------------|
    //                 v = 0 log(v)
    //                 |-|
    // wait1()が失敗すると、Promise.all()は拒否され、log(e.message)が出力される
    let v = 42;
    try {
        await Promise.all([
            wait3().then(() => {
                v = 0;
                errX();
            }),
            wait2().then(() => {
                logB();
                return "B";
            }),
            wait1().then(() => {
                errY();
            }),
        ]);
    } catch (e) {
        log(e.message);
        log(v);
        await wait3();
        log(v);
    }
}

async function i4() {
    // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
    // 回答
    // wait5()
    // |-------------------------|
    //                           log 0
    //                           |-|
    //                            wait4()
    //                           |--------------------|
    //                                                log 1
    //                                                |-|
    //                                                 wait3()
    //                                                |---------------|
    //                                                                log 2
    //                                                                |-|
    //                                                                 wait2()
    //                                                                |----------|
    //                                                                           log 3
    //                                                                           |-|
    //                                                                            wait1()
    //                                                                           |-----|
    //                                                                                  log 4
    //                                                                                  |-|
    //                                                                                  log COMPLETED
    // 説明
    // p = Promise.resolve(null)で, nullで解決するPromiseを作成
    // その後、順番でwait(5), wait(4), wait(3), wait(2), wait(1)を実行し、それぞれの後にlog(i)を出力
    let p = Promise.resolve(null);
    for (let i = 0; i < 5; ++i) {
        p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
    }
    return p.then(() => log("COMPLETED"));
}

async function i5() {
    // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
    // 回答
    // COMPLETEDが最初に出力される
    // その後、1秒ごとに4,3,2,1,0が出力される
    // 説明
    // .then(() => log(i))が入れ子になっているため、pの解決を待たずに次のPromiseが作成される
    // そのため、COMPLETEDが最初に出力される
    // そして、作成されたPromiseが順次解決され、1秒ごとに4,3,2,1,0が出力される
    let p = Promise.resolve(null);
    for (let i = 0; i < 5; ++i) {
        p = p.then(wait((5 - i) * 1000).then(() => log(i)));
    }
    return p.then(() => log("COMPLETED"));
}

async function i6() {
    // 回答: 1秒ごとに4,3,2,1,0が出力され、最後にCOMPLETEDが出力される
    // Promise.all()には並列実行のため、wait(5), wait(4), wait(3), wait(2), wait(1)が同時に始める
    // そのため、1秒ごとに4,3,2,1,0が出力される
    return Promise.all(
        [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i)))
    ).then(() => log("COMPLETED"));
}

async function i7() {
    // NOTE: i8 との比較用
    // 回答: 約11秒後に 10 が出力される
    // p1()とp2()が並列に実行され、p1()はp2()より1秒遅くvを更新する
    // 1秒ごとにvが更新され、最終的に10になる
    let v = 0;

    // 1秒待った後に2秒間隔で value の値を更新
    const p1 = async () => {
        await wait1();
        for (let i = 0; i < 5; i++) {
            const next = v + 1;
            v = next;
            await wait2();
        }
        return v
    };

    // 2秒間隔で value の値を更新
    const p2 = async () => {
        for (let i = 0; i < 5; i++) {
            const next = v + 1;
            v = next;
            await wait2();
        }
        return v
    };

    await Promise.all([p1(), p2()]);
    // console.log(a)
    log(v);
}
i8()
async function i8() {
    // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
    // 回答: 約11秒後に 5 が出力される
    // 説明: vが更新して2秒待つではなく、2秒待ってからvを更新するため、vが5になる
    let v = 0;

    const p1 = async () => {
        await wait1();
        for (let i = 0; i < 5; i++) {
            // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
            const next = v + 1;
            await wait2();
            v = next;
        }
    };

    const p2 = async () => {
        for (let i = 0; i < 5; i++) {
            const next = v + 1;
            await wait2();
            v = next;
        }
    };

    await Promise.all([p1(), p2()]);
    log(v);
}
