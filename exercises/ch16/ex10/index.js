import fs from 'node:fs'

// NOTE: file.txt の内容をアップロード
fetch("http://localhost:8000/foo/bar/hello.txt", {
    method: "PUT",
    body: fs.createReadStream("./file.txt"),
    duplex: "half",
});
