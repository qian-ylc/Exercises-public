予想：何も出力しない
実際：コードがずっとwhile(true)に中に動いている、何も出力しなかった。
そして、control+cを押した後、「"Hello, world!"」を出力した。（REPL環境）

このケースは、longRunningFunction()がタスクキューに入れられて、setTimeout()のコールバックはマイクロタスクキューに入れられた。longRunningFunction()がcontrol+cで強制中止した後、マイクロタスクキューにあるsetTimeout()を処理