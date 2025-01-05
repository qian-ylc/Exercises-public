### C10K問題
- https://ja.wikipedia.org/wiki/C10K%E5%95%8F%E9%A1%8Cにより、
- Webサーバソフトウェアとクライアントの通信において、クライアントが約1万台に達すると、Webサーバーのハードウェア性能に余裕があるにもかかわらず、レスポンス性能が大きく下がる問題である。
- 1999年に、Dan Kegel氏による
  - http://kegel.com/c10k.html#top

### C10K問題の解決
#### nginx
- nginxは、C10K問題をシングルプロセス、ノンブロッキングI/Oで解決した
- Apacheはマルチプロセスで、プロセスごとにCPUやメモリを消費する。アクセス数が増えると、プロセスも増加する。->　アクセス数が多くなる場合、スペックが足りなくなるリスクがある
- Nginxはアクセスが増加してもプロセス数は一定である。
- https://zenn.dev/tmikada/articles/performance-c10kproblem
- https://qiita.com/hiroaki-u/items/f2455d62f8a4017663cb

#### node.js
- nodejsもシングルプロセス、ノンブロッキングI/O
- nodejsは非同期処理で、アクセスが増えてもメモリ消費量が小さくて済む
- https://xtech.nikkei.com/it/article/COLUMN/20120725/411441/


