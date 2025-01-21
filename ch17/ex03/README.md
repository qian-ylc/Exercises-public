- npm(node package manager): Node.jsのパッケージ管理ツール
- npx(node package executer): Node.jsのパッケージ実行ツール

### npm runとnpx

- npm run:
  - 実行したいパッケージを予めインストールして、package.jsonのscriptsに記述して、`npm run (scripts)`で実行
  - パッケージの依存関係を管理する
- npx:
  - 一時的なパッケージ実行ができる、パッケージの依存関係の管理をしない
  - インストールしなくても、そのパッケージを自動的にインストールをして、パッケージを実行する
  - 特定のバージョンのパッケージを指定して実行できる
  - 複数のグローバルパッケージを同時に使用できる

参考:

- https://qiita.com/kohta9521/items/ee3ed4a2360add80ad79
- https://zenn.dev/uniformnext/articles/c68ea2bb6cbe00
