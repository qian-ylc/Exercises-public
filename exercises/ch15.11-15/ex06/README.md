- 同一ブラウザの異なるタブで開く
  - localStorageは内容を維持できる
  - sessionStorageは、新しいタブには何もない(新しいセッションになる)
- 閉じらタブをもう一度開く(右クリック「閉じたタブを開く」ではない)
  - localStorageは内容を維持できる
  - sessionStorageは、新しいタブには何もない(元のセッションが戻れない)
-----------------------
https://developer.mozilla.org/ja/docs/Web/API/Window/sessionStorage
- localStorage: ブラウザ閉じでも維持。ローカルデータを明示的に削除しない限り、データが維持される
- sessionStorage: ページのセッションが終了するときに消去される

