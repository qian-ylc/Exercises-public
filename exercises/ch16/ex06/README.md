`fs.promises.truncate("./file.txt",1000)`で試した。
HexEditorで開くと、このようになった。
![](image-1.png)
ASCIIの0は、このように
![alt text](image-2.png)

----------------
普通のエディタは、このようになる
![alt text](image-3.png)
書き込んだものは、nullバイトである。

