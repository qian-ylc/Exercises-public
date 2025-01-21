- package.json:
  - 現在のプロジェクトに使われるパッケージの情報が記載される
  - `npm install`実行時に新規作成・更新される
  - `"jest": "^29.7.0"`のように、^(キャレット)がある。1番左の桁の数字のみを固定する。バージョン範囲を指定する。
  - プロジェクトが依存するパッケージの情報があるが、パッケージが依存するパッケージの情報が記載されない
- package-lock.json:
  - `npm install`の実際にインストールしたパッケージのバージョンが記載される
  - 依存関係があるパッケージについての情報が記載される
  - プロジェクトが依存する全てのパッケージのバージョンを固定できる
  - リポジトリにコミットすべきファイルである。package-lock.jsonで全てのパッケージのバージョンを固定できるので、package-lock.jsonに基づいてパッケージをインストールする

参考:

- https://qiita.com/phoby20/items/ca17d96bbf0da0b9989e
- https://note.com/shohey_tech/n/n103120f6295e
- https://qiita.com/sugurutakahashi12345/items/1f6bb7a372b8263500e5
