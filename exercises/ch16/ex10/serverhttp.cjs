// これは指定されたディレクトリからファイルを提供するシンプルで静的なHTTP
// サーバ。また、受信したリクエストをエコーする特別な/test/mirror
// エンドポイントも実装している。これは、クライアントをデバッグする際に便利。
const http = require("http"); // 証明書を持っている場合は「https」を使用する。
const url = require("url"); // URL解析用。
const path = require("path"); // ファイルシステムのパス操作用。
const fs = require("fs"); // ファイル読み込み用。


// bodyのストリームを受け取る方法？

// 指定されたポートで待ち受けるHTTPサーバを介して、
// 指定されたルートディレクトリのファイルを提供する。
function serve(rootDirectory, port) {
    let server = new http.Server(); // 新しいHTTPサーバを作成する。
    server.listen(port); // 指定されたポートで待ち受ける。
    console.log("Listening on port", port);
    // リクエストが届いたら、この関数で処理を行う。
    server.on("request", (request, response) => {
        if (request.method === "GET") {
            // リクエストURLのパス部分を取得する。その際、付加されている
            // クエリパラメータは無視する。
            let endpoint = url.parse(request.url).pathname;
            // リクエストが「/test/mirror」の場合、リクエストをそのまま送り返す。
            // リクエストのヘッダやボディを見たい場合に便利。
            if (endpoint === "/test/mirror") {
                console.log("mirror")
                // レスポンスヘッダを設定する。
                response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                // レスポンスのステータスコードを指定する。
                response.writeHead(200); // 200 OK
                // レスポンスボディの最初はリクエスト。
                response.write(`${request.method} ${request.url} HTTP/${request.httpVersion
                    }\r\n`);
                // リクエストヘッダを出力する。
                let headers = request.rawHeaders;
                for (let i = 0; i < headers.length; i += 2) {
                    response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
                }
                // ヘッダの末尾に空行を追加する。
                response.write("\r\n");
                // 次に、リクエストボディをレスポンスボディにコピーする必要がある。
                // 両方ともストリームなので、パイプを使うことができる。
                request.pipe(response);
            }
            // それ以外の場合は、ローカルディレクトリからファイルを提供する。
            else {
                // エンドポイントをローカルファイルシステムのファイルにマッピングする。
                let filename = endpoint.substring(1); // 最初の/を取り除く。
                // パス中の「../」を禁止する。ルートディレクトリの外側のファイルを提供する
                // ことになり、セキュリティホールになるから。
                filename = filename.replace(/\.\.\//g, "");
                // 次に、相対パスを絶対パスに変換する。
                filename = path.resolve(rootDirectory, filename);
                console.log("filename: ", filename)
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
                    // パイプは自動的にresponse.end()を呼び出す。
                    response.setHeader("Content-Type", type);
                    response.writeHead(200);
                    stream.pipe(response);
                });
                stream.on("error", (err) => {
                    // ストリームを開こうとしてエラーが発生した場合、
                    // そのファイルはおそらく存在しないか、読めないと思われる。
                    // エラーメッセージをプレーンテキストで記述して、
                    // 404 Not Foundレスポンスを送信する。
                    response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                    response.writeHead(404);
                    response.end(err.message);
                });
            }
        }
        if (request.method === 'PUT') {
            let endpoint = url.parse(request.url).pathname;
            let filename = endpoint.substring(1); // 最初の/を取り除く。
            // パス中の「../」を禁止する。ルートディレクトリの外側のファイルを提供する
            // ことになり、セキュリティホールになるから。
            filename = filename.replace(/\.\.\//g, "");
            // 次に、相対パスを絶対パスに変換する。
            filename = path.resolve(rootDirectory, filename);
            console.log("filename: ", filename)
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
            console.log("type: ", type)

            let writestream = fs.createWriteStream(filename);
            // bodyのストリームを受け取る方法？
            request.pipe(writestream)
            request.on("end", () => {
                response.setHeader("Content-Type", type);
                response.writeHead(200);
                response.end()
            })
            // let readstream = request.
            //     console.log(request)
            // writestream.once('ready', () => {
            //     readstream.pipe(writestream)
            // })
            // writestream.once('finish', () => {
            //     response.setHeader("Content-Type", type);
            //     response.writeHead(200);
            //     console.log("finish")
            // })
            // writestream.on("error", (err) => {
            //     response.setHeader("Content-Type", "text/plain; charset=UTF-8");
            //     response.writeHead(404);
            //     response.end(err.message);
            // });

        }
    });

}

// コマンドラインから起動された場合は、serve()関数を呼び出す。
serve(process.argv[2] || "./tmp", parseInt(process.argv[3]) || 8000);