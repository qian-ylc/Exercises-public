### tsc
- TypeScriptの開発チームによるTypeScriptのトランスパイラで、TypeScriptのファイルをJavaScriptにコンパイルできる。
- 型チェックの機能がある
- トランスパイラをする対象は、JavaScriptの構文だけ。Babelとの組み合わせで、この問題を解決する

### Babel
- プログラミング言語の最新機能を使って記述されたJavaScriptを、最新機能を使わない JavaScript にコンパイルする
- Babelには、型チェックがない。一つの解決方法は、tscで別途型チェックをする
- 実際のプロジェクトには、Babelエコシステムの組み合わせてトランスパイルをやる

### 参考
- https://t-yng.jp/post/tsc-and-babel
- https://blog.logrocket.com/babel-vs-typescript-choosing-right-compiler-project/