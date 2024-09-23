// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/import#ユーザー操作に応じたオンデマンドのインポート
// link要素をクリックすると、module.jsをインポートしてmainに表示する
// クリックしたlink要素のtextContentを渡してloadPageInto関数を呼び出す

// 動作確認
// live-serverを起動する http://localhost:5500/exercises/ch15.01-03/ex02/
// Page1をクリックすると、Hello, Loading Page1... が表示される

const main = document.querySelector("main");
for (const link of document.querySelectorAll("nav > a")) {
    link.addEventListener("click", async (e) => {
        e.preventDefault();

        let myModule = await import("./module.js");
        myModule.loadPageInto(main, e.target.textContent);

        // import("./module.js")
        //     .then((module) => {
        //         module.loadPageInto(main, link.textContent);
        //     })
        //     .catch((err) => {
        //         main.textContent = err.message;
        //     });
    });
}



