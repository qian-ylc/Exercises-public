https://developers.google.com/search/blog/2009/10/proposal-for-making-ajax-crawlable によると、
> Instead of a URL like https://example.com/page?query#state we would like to propose adding a token to make it possible to recognize these URLs: https://example.com/page?query#[FRAGMENTTOKEN]state. \
> Based on a review of current URLs on the web, we propose using "!" (an exclamation point) as the token for this. The proposed URL that could be shown in search results would then be: https://example.com/page?query#!state

グーグルは2009年にhashbangを提案された。Ajaxに基づいたサイトがGoogleクローラーでクロール可能にするため、URLに`[FRAGMENTTOKEN]`トークンを入れる。おすすめのトークンは`!`で、hashbangの`#!`になる。

https://developers.google.com/search/blog/2015/10/deprecating-our-ajax-crawling-scheme?hl=ja \
しかし、2015年Googleが、このhashbangでajaxサイトをクロール可能にする方法を推奨しません、と言った。
以前はクローラがサイトのコンテンツを認識できなかった対策として、hashbangを提案したが、\
サイトをレンダリングして理解する方法の改善によって、hashbangを使う必要がなくなった。
