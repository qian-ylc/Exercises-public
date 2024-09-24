https://developer.mozilla.org/ja/docs/Glossary/Clickjacking \
クリックジャッキング(clickjacking):
> クリックジャッキングとは、ウェブサイトの利用者をだまして、悪意のあるリンクを無意識にクリックさせるインターフェイスベースの攻撃である。

https://www.ipa.go.jp/security/vuln/websecurity/clickjacking.html \
iframeを使ってクリックジャッキングをする流れ:\
irameタグでユーザーにクリックさせたいページの透明ページを作成し、罠ページの上に重ね合わせる。ユーザーが罠ページだけ見える。\
罠ページのコンテンツをクリックするつもりが、実際にはクリックさせたいページのコンテンツをクリックすることになる。

クリックジャッキングの一つの対策として、X-Frame-Optionsを使うことがある。\
X-Frame-Options: DENYで、フレームを表示すると失敗になる。

script.jsでiframe内の他サイトのDOM変更が可能であれば、\
iframeで作られた透明ページのコンテンツ変更が可能になる。\
ユーザーの個人情報の意図しない変更、意図しない商品の購入や送金など、ユーザーの意図ではない操作を起こすことがある。


