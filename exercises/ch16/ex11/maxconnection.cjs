// クライアントを作成して接続する
// 10000で試したが、全部成功したケースや7000ぐらいで失敗になったケースがある
// 可能な理由: 
// 1. サーバーのリソースが足りない
// 2. サーバーの設定やクライアント設定の制限
// 3. システムリソースの制限
const net = require('net');

const maxConnections = 10000; // テストする接続数の上限
let connections = 0;

let flag = true;
for (let i = 0; i < maxConnections; i++) {
    if (flag === false) {
        process.exit(1)
    }
    const client = new net.Socket();

    client.connect(8000, 'localhost', () => {
        connections++;
        console.log(`Connection ${connections} established`);
    });

    client.on('error', (err) => {
        console.error(`Connection ${connections} failed: ${err.message}`);
        flag = false
    });

    client.on('close', () => {
        console.log("closed")
        process.exit(1)
    });
}
