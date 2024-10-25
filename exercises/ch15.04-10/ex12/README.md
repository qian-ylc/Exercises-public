### Active や Completed を選択後にブラウザのリロードを行うとどうなるだろうか
- hashChange: ブラウザのリロードをすると、入力した項目が全部消える。
  - Networkタブでチェックすると、http://localhost:3000/ch15.04-10/ex11 を開くと同じ通信を行った。index.html, index.jsとstyle.cssをリクエストした
- pushState: ページが404エラーになる
  - Networkタブでチェックすると、http://localhost:3000/ch15.04-10/ex12/completed をリクエストしたが、404エラーになった

### サーバー側がどのような挙動をすれば pushState を使った実装が期待通り動作する
- pushStateでURLを変更する時、サーバーがpushStateで指示したURLから直接にリソースをリクエストするではなく、

