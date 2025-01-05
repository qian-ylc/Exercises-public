`SIGTEAM`シグナルで、プロセスに対して終了を要求するシグナルで、Graceful Shutdown でプロセスを終了する。
- `SIGTEAM`は終了要求のシグナルであるが、プロセスはこれを受信後も動くことはできる。
- Graceful Shutdown として、作業をキリのいいところまで処理してから安全に終了することを目指す。

参考: https://qiita.com/suin/items/122946f7d0cd13b143f9