## ReactのXSS対策

### JSXの自動エスケープ
https://ja.legacy.reactjs.org/docs/introducing-jsx.html 
> デフォルトでは、React DOM は JSX に埋め込まれた値をレンダー前にエスケープします。
```
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

ユーザーで入力された内容は、レンダー前に自動的にエスケープ処理されて、ユーザー入力がそのままHTMLに挿入されることを防ぎ、XSS攻撃を防ぐ。

### dangerouslySetInnerHTML
https://ja.react.dev/reference/react-dom/components/common#common-props
> `{ __html: '<p>some html</p>' }` という形式の、内部に生の HTML 文字列を含んだオブジェクト。DOM ノードの innerHTML プロパティを上書きし、渡された HTML を表示します。

HTMLを直接挿入することができますが、その名前の通り、最大限に注意して使用する必要がある。\
信頼できるデータのみを渡すのは重要である。

https://ja.react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html
> {__html} というオブジェクトは、HTML が生成される場所にできるだけ近いところで作成するようにしてください。`<div dangerouslySetInnerHTML={{__html: markup}} />` のようにしてこのオブジェクトをインラインで作成することは推奨されません。

```
function renderMarkdownToHTML(markdown) {
  // This is ONLY safe because the output HTML
  // is shown to the same user, and because you
  // trust this Markdown parser to not have bugs.
  const renderedHTML = md.render(markdown);
  return {__html: renderedHTML};
}

export default function MarkdownPreview({ markdown }) {
  const markup = renderMarkdownToHTML(markdown);
  return <div dangerouslySetInnerHTML={markup} />;
}
```

## サニタイズライブラリ
DOMPurifyなどのユーザー入力をサニタイズするライブラリ
https://github.com/cure53/DOMPurify
```
import DOMPurify from 'dompurify';

const userInput = "<script>alert('XSS');</script>";
const sanitizedHTML = DOMPurify.sanitize(userInput);
```

サニタイズライブラリにはバグがある、またはサニタイズ処理漏れがある場合、XSS攻撃のリスクが残っている。\
動的に生成されるスクリプトを使える場合(evalやnew Function)、それらに対してのサニタイズが不完全な可能性があり、XSS攻撃のリスクが高くなる。

