https://code.visualstudio.com/docs/editor/refactoring#_rename-symbol

10.3に作成されたエクスポート元のクラスに対して、
右クリック->シンボルの名前変更でクラスの名前を変更すると、
```
plus(other) {
        return new PointRename(this.x + other.x, this.y + other.y);
    }

minus(other) {
        return new PointRename(this.x - other.x, this.y - other.y);
    }
```
のように、point.cjs内にクラス名前を使ったところにも変更があるが、\
作成されたエクスポート元のクラスの名前を変更しても、インポート側が\
`const Point = require('./point.cjs');` \
のパスだけを記載する形になるので、index.cjsにはパスが変更されないため特に対応が不要そう。

10.4のモジュールには、
- デフォルトエクスポート: 
  - Personクラスの名前を変更してみた。person.jsにPersonクラスを使ったところにも変化が起きた。
  - person.jsのエクスポートには、`export { PersonRe as Person }`になった。
  - index.jsには特に変化がなかった
- 名前変更を伴うインポート:
  - Teacherクラスの名前を変更してみた。
  - 上と同じように、`export { TeacherRe as Teacher }`になった。
  - index.jsには特に変化がなかった
- 再エクスポート:
  - Studentクラスの名前を変更してみた。
  - 上と同じように、`export { StudentRe as Student }`になった。
  - index.jsには特に変化がなかった
