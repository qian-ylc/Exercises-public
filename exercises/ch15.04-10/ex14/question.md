## 問題 15.4-10.14 🖋️

昨今の Web アプリケーションフレームワークで `pushState` がどう使われているか調べよう。以下の手順に従って実験しなさい:

まず適当なディレクトリで以下のコマンドを実行し sandbox プロジェクトを作成する:

```sh
> npx create-next-app sandbox --ts --tailwind --app --use-npm --eslint --no-src-dir  --no-import-alias
```

次に作成された sandbox プロジェクトに移動し実行する:

```sh
> cd sandbox
> npm run dev
...
```

http://localhost:3000 や http://localhbost:3001 といった URL で Web サービスが実行されていることを確認できる (ポート番号は上記コマンドの出力を参照)。

では次に app/foo/page.tsx および app/bar/page.tsx を以下のように作成しよう:

```jsx
// app/foo/page.tsx
import Link from "next/link";

export default function Foo() {
  return (
    <div>
      This is Foo!
      <br />
      (move to <Link href="bar">Bar</Link>)
    </div>
  );
}

// app/bar/page.tsx
import Link from "next/link";

export default function Bar() {
  return (
    <div>
      This is Bar!
      <br />
      (move to <Link href="foo">Foo</Link>)
    </div>
  );
}
```

上記のファイルを追加によって http://localhost:3000/foo や http://localhbost:3001/foo といったページが追加される (`serve` が 3000 番ポートを既に利用中の場合は注意)。

それではブラウザの開発者ツールで以下を実行し `pushState` の呼び出しがログに出力されるようにした状態でリンクを選択するとどうなるだろうか？

```js
window.history.pushState = new Proxy(window.history.pushState, {
  apply: (target, thisArg, argArray) => {
    console.log("pushState is called:", argArray);
    return target.apply(thisArg, argArray);
  },
});
```

問題:

- ブラウザの開発者ツールの「ネットワーク」タブを確認してみよう。リンクをクリックしたときに通信は発生しているだろうか？
- pushState はいつ実行されているだろうか？
- 15.4-10.12 では pushState を使った実装でページのリロード時に正しく動作しなかったが、この問題ではどうだろうか？

この問題を通して「昨今のフレームワークはリンク (通常は `<a>` タグを利用) ですら内部で複雑なことを実施している」ことが伝われば幸いである (もしかしたらトラブル時に知っておくと助けになるかもしれない)。余談だが [Next.js App Router と控えめにお付き合いして普通の Web アプリを配信する](https://zenn.dev/overflow_offers/articles/20240112-using-nextjs-app-router-sparingly) のように `<Link>` を使わないスタイルも存在する。
