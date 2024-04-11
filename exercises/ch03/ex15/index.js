/* eslint-disable */
for (let i = 0; i < 10; i++) {
    (function () {
        let i = 100; //無効？
    })();
    console.log(i); //ループのi
}
console.log(i); //スコープ以外なので未定義にした
