## クロスオリジンリクエストに制約が無かった場合、どのような問題が発生するか
- セキュリティリスクが大きくなる
  - （ユーザーがAサイトにサインインしている場合）悪意のあるウェブサイトがユーザーのAサイト認証情報が利用されてしまって、不正なリクエストを送信することなど
    - csrf攻撃と呼ばれる
  - ユーザーのローカルストレージが読み取られ、データ漏洩のリスクが大きくなる

## クロスオリジンリクエストで メソッド(POST/GET)やリクエストの内容によって Preflight リクエストの有無が異なるのは何故か
- PUT, DELETE, POSTのようなサーバーデータに対して変更をする操作があるリクエストの場合、それらのリクエストを送信する前に、そのリクエストを許可するかどうかをサーバーに尋ねることができる。これにより、サーバーが意図しないリクエストを受け入れるリスクを軽減します。
- GETのような標準的なヘッダーのみ使っているリクエストは、Preflightが不要
- リクエスト内容には、キャッシュ可能な内容ではキャッシュが効けば、次回以降Preflightが不要になる
--------------------
参考：
- https://www.ipa.go.jp/security/vuln/websecurity/csrf.html
- https://developer.mozilla.org/ja/docs/Web/Security/Same-origin_policy
- https://developer.mozilla.org/ja/docs/Glossary/Preflight_request
- https://zenn.dev/tm35/articles/ad05d8605588bd
- https://zenn.dev/qnighy/articles/6ff23c47018380#preflight%E3%81%8C%E4%B8%8D%E8%A6%81%E3%81%AA%E3%82%B1%E3%83%BC%E3%82%B9