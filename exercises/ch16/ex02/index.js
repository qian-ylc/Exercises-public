import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
    const childPath = path.join(__dirname, "child.js");
    child = spawn("node", [childPath]);

    child.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
    });

    child.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
        startChild()
    });

    return new Promise((res) => {
        child.on("close", (code, signal) => {
            res([code, signal]);
            // 子プロセスが異常終了した場合、再起動する
            // closeの場合いつもprocess.exit(1)?
            if (signal) {
                console.log(`子プロセスがシグナル ${signal} によって終了`);
                process.exit(1);
            } else if (code !== 0) {
                startChild();
            }
        });
    });
}

// TODO: ここに処理を書く
// シグナルをトラップして子プロセスに通知する
// control+c: SIGINT
['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
        console.log(`シグナル ${signal} `);
        if (child) {
            child.kill(signal);
        }
    });
});

startChild()