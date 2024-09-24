自分が運営する販売サイトにYouTubeのトップページをiframeで組込み、更に自作のscript.jsによりiframe内のデータを分析しようとしています。

```html
<iframe id="other" src="https://www.youtube.com/"></iframe>
<script src="./script.js"></script>
...
```
```js
(async () => {
  // YouTube が利用者に推薦する動画タイトルを取得すれば、利用者に最適な商品セットを表示できるのではないか？
  const titles = document.getElementById("").contentWindowquerySelectorAll('#video-title');
  for (const t of titles) {
    await fetch("your-server-path", { method: "POST", body: t.textContent })
  }
});
```

しかし、トップページを読み込むとエラーになります。用語「クリックジャッキング」を調べて理由を説明しなさい。<br>
また、script.jsも動作しません。ここで、同一オリジンポリシーがなく、iframe内の他サイトのDOM変更が可能な仕様を想定し、どのような重大な問題が発生しうるか記載しなさい。
