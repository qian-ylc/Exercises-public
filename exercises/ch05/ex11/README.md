`node inspect index.js`で、デバックモードに入る。\
`NODE_INSPECT_RESUME_ON_START=1 node inspect index.js`で、設定されておいた最初のブレークポイントまで実行する。\
コードにdebuggerを置くと、ブレークポイントを指定できる。

基本操作
- c: continue 実行を継続する
  - 次のブレークポイントを移動
  - もしくはコード実行完了まで
- n: step next 次の行を実行する
- s: step in 関数に入る
- o: step out 関数から出る
- 値を確認したい場合
  - `debug> repl`
  - 変数名を入力して値を確認する
  - control + cでreplから退出

いくつかのコマンド
- watch(): 変数の値をウォッチする
- list(n): 前後n行のコードを表示する


参考：https://nodejs.org/api/debugger.html 


