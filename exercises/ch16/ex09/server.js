import express from 'express';
import path from 'path'
import url from 'url'
import fs from 'node:fs'

export const app = express();
const port = process.argv[3] || 8000;

// 指定されたルートディレクトリのファイルを提供する。
export function serve(rootDirectory, port) {
    // サーバーの起動
    app.listen(port, () => {
        console.log("Listening on port", port);
    });

    app.use((req, res, next) => {
        let endpoint = url.parse(req.url).pathname;
        // リクエストが「/test/mirror」の場合、リクエストをそのまま送り返す。
        console.log(endpoint)
        if (endpoint === "/test/mirror") {
            // レスポンスヘッダを設定する。
            res.setHeader("Content-Type", "text/plain; charset=UTF-8");
            // レスポンスのステータスコードを指定する。
            res.writeHead(200); // 200 OK
            // レスポンスボディの最初はリクエスト。
            res.write(`${req.method} ${req.url} HTTP/${req.httpVersion
                }\r\n`);
            // リクエストヘッダを出力する。
            let headers = req.rawHeaders;
            for (let i = 0; i < headers.length; i += 2) {
                res.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
            }
            // ヘッダの末尾に空行を追加する。
            res.write("\r\n");
            // 次に、リクエストボディをレスポンスボディにコピーする必要がある。
            // 両方ともストリームなので、パイプを使うことができる。
            req.pipe(res);
            // それ以外の場合は、ローカルディレクトリからファイルを提供する。
        } else {
            // エンドポイントをローカルファイルシステムのファイルにマッピングする。
            let filename = endpoint.substring(1); // 最初の/を取り除く。
            // パス中の「../」を禁止する。ルートディレクトリの外側のファイルを提供する
            // ことになり、セキュリティホールになるから。
            filename = filename.replace(/\.\.\//g, "");
            // 次に、相対パスを絶対パスに変換する。
            filename = path.resolve(rootDirectory, filename);
            // 拡張子に基づいて、ファイルのコンテンツタイプを推測する。
            let type;
            switch (path.extname(filename)) {
                case ".html":
                case ".htm": type = "text/html"; break;
                case ".js": type = "text/javascript"; break;
                case ".css": type = "text/css"; break;
                case ".png": type = "image/png"; break;
                case ".txt": type = "text/plain"; break;
                default: type = "application/octet-stream"; break;
            }
            let stream = fs.createReadStream(filename);
            stream.once("readable", () => {
                // ストリームが読み込めるようになったら、Content-Typeヘッダと
                // 200 OKステータスを設定する。そして、ファイル読み出し
                // ストリームをレスポンスにパイプする。ストリームが終了すると、
                // パイプは自動的にres.end()を呼び出す。
                res.setHeader("Content-Type", type);
                res.writeHead(200);
                stream.pipe(res);
            });
            stream.on("error", (err) => {
                // ストリームを開こうとしてエラーが発生した場合、
                // そのファイルはおそらく存在しないか、読めないと思われる。
                // エラーメッセージをプレーンテキストで記述して、
                // 404 Not Foundレスポンスを送信する。
                res.status(404).send(err);
            });
        }
    });

}

// コマンドラインから起動された場合は、serve()関数を呼び出す。
// serve(process.argv[2] || "./tmp", parseInt(process.argv[3]) || port);