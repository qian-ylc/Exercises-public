function wait(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
}

// 0, 1, 2, 3 秒待つ
const wait0 = () => wait(0);
const wait1 = () => wait(1000);
const wait2 = () => wait(2000);
const wait3 = () => wait(3000);
const wait10 = () => wait(10000);

// ログ出力
const log = (v) => console.log(v);
const logA = (v) => console.log("A");
const logB = (v) => console.log("B");
const logC = (v) => console.log("C");

// 例外
const errX = () => {
    throw new Error("X");
};
const errY = () => {
    throw new Error("Y");
};

function f11() {
    // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？

    // 回答: すぐに X が出力される
    // 説明: new PromiseにエラーXが発生すると、catchでエラーXが出力される
    new Promise((resolve, reject) => {
        errX();
    }).catch((e) => log(e.message));
}

f11()