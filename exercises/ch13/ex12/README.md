結果：ex01と同じように、無限ループで、何も出力しなかった. 
await nullをawait new Promise(resolve => setTimeout(resolve, 1000))に変更すると、
1秒待ってHello, World!が出力され、そして無限ループになった。

await nullに対して、「'await' は、この式の型に対しては効果がありません」と表示される。\
awaitの後に、非同期関数が必要？

https://zenn.dev/estra/books/js-async-promise-chain-event-loop/viewer/d-epasync-task-microtask-queues
> マイクロタスク自体は、それを呼び出し関数やプログラムが実行された後にコールスタックが空になった後にのみ実行される短い関数です。API や Promise の then() メソッドなどの引数に渡すコールバック関数がマイクロタスクとして扱われます。
awaitもそのケース？


