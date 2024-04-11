ループ内のconsole.log(i)は毎回のループのiの値を出力する。\
function()内のスコープのiは実際に使われていない。\
外のconsole.log(i)のiは未定義とした。

letをvarに変更すると、\
ループ中のiがグローバル変数になり、最後のconsole.log(i)で出力可能
