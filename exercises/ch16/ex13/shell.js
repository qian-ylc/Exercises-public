import fs from "fs";
import readline from "readline";
import { spawn } from "child_process";
import { PassThrough } from "stream";
import path from "path";

// コマンドの実行
class ExecCmd {
    constructor(argv) {
        this.type = " ";
        this.argv = argv;
    }
}

// リダイレクト
class RedirCmd {
    constructor(cmd, file, type) {
        this.type = type; // "<" or ">"
        this.cmd = cmd;
        this.file = file;
    }
}

// パイプ
class PipeCmd {
    constructor(left, right) {
        this.type = "|";
        this.left = left;
        this.right = right;
    }
}

// NOTE: 以下のコマンドをパースした場合:
// ```
// echo HELLO | tr [:upper:] [:lower:] > hello.txt
//```
// 以下のようなオブジェクトが生成されるものとする
// new PipeCmd(
//   new ExecCmd(["echo", "HELLO"]),
//   new RedirCmd(new ExecCmd(["tr", "[:upper:]", "[:lower:]"]), "hello.txt", ">")
// )

// コマンドを実行する関数
async function runcmd(cmd, stdin = null, stdout = null) {
    console.log("cmd: ", cmd)
    console.log("stdin stdout: ", cmd.stdin, cmd.stdout)
    switch (cmd.type) {
        case " ": // ExecCmd
            await new Promise((resolve, reject) => {
                // stdin, stdout が指定されている場合はパイプを作成する
                const child = spawn(cmd.argv[0], cmd.argv.slice(1), {
                    stdio: [
                        stdin ? "pipe" : "inherit",
                        stdout ? "pipe" : "inherit",
                        "inherit",
                    ],
                });

                if (stdin) {
                    stdin.pipe(child.stdin);
                }
                if (stdout) {
                    child.stdout.pipe(stdout);
                }

                child.on("exit", () => resolve());
                child.on("error", (err) => reject(err));
            });
            break;

        case ">": // RedirCmd
            {
                // FIXME: ここを実装してね (2行程度)
                // HINT: cmd.file のストリームを createWriteStream で作成し runcmd を再帰的に呼び出す
                const cmdfilename = cmd.file;
                const filepath = path.resolve("/Users/qian/exercises-public/exercises/ch16/ex13", cmdfilename)
                const stream = fs.createWriteStream(filepath)
                // for (let i = 1; i < cmd.cmd.argv.length; i++) {
                //     stream.write(cmd.cmd.argv[i])
                //     stream.write(" ")
                // }
                // streamをstdoutに -> case " " パイプ作成
                await runcmd(cmd.cmd, stdin, stream);
                console.log(">: ", cmd.cmd)
                stream.end();
            }
            break;

        case "<": // RedirCmd
            {
                // FIXME: ここを実装してね (2行程度)
                // HINT: cmd.file のストリームを createReadStream で作成し runcmd を再帰的に呼び出す
                const cmdfilename = cmd.file;
                const filepath = path.resolve("/Users/qian/exercises-public/exercises/ch16/ex13", cmdfilename)
                const stream = fs.createReadStream(filepath);
                // sort < hello.txtでstdoutとして結果をみえる
                await runcmd(cmd.cmd, stream, stdout);
                // fs.createReadStream(filepath).pipe(process.stdout)

            }
            break;

        case "|": // PipeCmd
            {
                // FIXME: ここを実装してね (4行程度)
                // HINT: cmd.left と cmd.right に対して runcmd を再帰的に呼び出し Promise.all で待つ
                // HINT: left と right を繋ぐには new PassThrought() で作成したストリームを使用する
                console.log("|: ", cmd)
                // leftの出力をrightにパイプする?
                const passThrough = new PassThrough();
                await Promise.all([
                    runcmd(cmd.left, stdin, passThrough),
                    runcmd(cmd.right, passThrough, stdout)
                ]);
            }
            break;

        default:
            console.error("unknown runcmd");
            process.exit(-1);
    }
}

// メイン関数
async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> ",
        terminal: false,
    });

    rl.prompt(); // > を表示

    for await (const rawLine of rl) {
        const line = rawLine.trim();
        console.log("line: ", line)
        if (line === "") {
            rl.prompt();
            continue;
        }
        if (line.startsWith("cd ")) {
            const dir = line.slice(3).trim();
            try {
                process.chdir(dir.trim());
            } catch (err) {
                console.error(`cannot cd ${dir}`);
            }
        } else {
            const cmd = parsecmd(line);
            // console.log("cmd: ", cmd)
            try {
                rl.pause();
                await runcmd(cmd);
            } catch (err) {
                console.error(err);
            } finally {
                rl.resume();
            }
        }
        rl.prompt();
    }
}

// コマンドのパースに使用する文字
const symbols = "<>";

// コマンド文字列を解析する関数
function parsecmd(input) {
    const cmds = input.split("|").map((cmd) => cmd.trim());
    const parsedCmds = cmds.map((cmd) => parseexec(tokenize(cmd)));
    return parsedCmds.reduce((prev, curr) => new PipeCmd(prev, curr));
}

// 入力をトークンに分割する関数
function tokenize(input) {
    // NOTE: `A B "C D" 'E F G'` は ["A", "B", "C D", "E F G"] に変換される
    return input
        .match(/'[^']*'|"[^"]*"|\S+/g)
        .map((s) => s.replace(/^['"]|['"]$/g, ""))
        .filter((s) => s !== "");
}

// ">" や "<" を見つけて RedirCmd に変換する
function parseredirs(cmd, tokens) {
    let redirectIndex = tokens.findIndex((token) => symbols.includes(token));

    while (redirectIndex !== -1) {
        const symbol = tokens[redirectIndex];
        const file = tokens[redirectIndex + 1];

        if (!file) {
            console.error("missing file for redirection");
            process.exit(-1);
        }

        cmd = new RedirCmd(cmd, file, symbol);
        tokens.splice(redirectIndex, 2);
        redirectIndex = tokens.findIndex((token) => symbols.includes(token));
    }

    return cmd;
}

function parseexec(tokens) {
    const argv = [];
    // NOTE: parsedirs によって tokens の中身が変更される (">", "foo.txt" といったリダイレクトが削除)
    const cmd = parseredirs(new ExecCmd(argv), tokens);
    // NOTE: 残った tokens を argv に追加する
    argv.push(...tokens);
    return cmd;
}

main();
