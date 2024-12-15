- トークンを使って、ヘッダーに機密情報を指定して送信する仕組みは、すでに標準化された方法がある
  - Authorization ヘッダ
- パスやクエリなどの機密情報をURLに埋め込む方法は、ブラウザの履歴やサーバーのログやキャッシュにURL情報が含まれいる可能性があるため、機密情報の漏洩の可能性がある
  - 調べてみると、トークンをURLで送信するのは、ワンタイムトークンの場合が多い？

参考：https://qiita.com/uasi/items/cfb60588daa18c2ec6f5