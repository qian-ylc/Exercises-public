import WebSocket, { WebSocketServer } from "ws";

// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1秒当たりの更新頻度
const FRAME_RATE = 10;

// WebSocketのポート
const port = 3003;
const wss = new WebSocketServer({ port });

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
    .fill(null)
    .map(() =>
        new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
    );
// 停止状態
let paused = true;

wss.on("connection", (ws) => {
    // 接続されたクライアントに初期のグリッドを送信
    ws.send(JSON.stringify({ type: "update", grid }));

    ws.on("message", (message) => {
        const data = JSON.parse(message.toString());
        switch (data.type) {
            case "toggle": // セルの反転
                grid[data.row][data.col] = !grid[data.row][data.col];
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: "update", grid }));
                    }
                });
                break;
            case "pause": // 停止
                paused = true;
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: "pause" }));
                    }
                });
                break;
            case "start": // 開始・再開
                paused = false;
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: "start" }));
                    }
                });
                break;
        }
    });
});

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
    // 新しいグリッドを作成
    const nextGrid = grid.map((arr) => [...arr]);

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
            let neighbors = [];
            if (row === 0 || row === ROWS - 1 || col === 0 || col === COLS - 1) {
                // 四角
                if (row === 0 && col === 0) {
                    neighbors = [grid[row][col + 1], grid[row + 1][col], grid[row + 1][col + 1]];
                }
                else if (row === 0 && col === COLS - 1) {
                    neighbors = [grid[row][col - 1], grid[row + 1][col - 1], grid[row + 1][col]];
                }
                else if (row === ROWS - 1 && col === 0) {
                    neighbors = [grid[row - 1][col], grid[row - 1][col + 1], grid[row][col + 1]];
                }
                else if (row === ROWS - 1 && col === COLS - 1) {
                    neighbors = [grid[row - 1][col - 1], grid[row - 1][col], grid[row][col - 1]];
                }
                else if (row === 0) {
                    neighbors = [grid[row][col - 1], grid[row][col + 1], grid[row + 1][col - 1], grid[row + 1][col], grid[row + 1][col + 1]];
                }
                else if (row === ROWS - 1) {
                    neighbors = [grid[row - 1][col - 1], grid[row - 1][col], grid[row - 1][col + 1], grid[row][col - 1], grid[row][col + 1]];
                }
                else if (col === 0) {
                    neighbors = [grid[row - 1][col], grid[row - 1][col + 1], grid[row][col + 1], grid[row + 1][col], grid[row + 1][col + 1]];
                }
                else if (col === COLS - 1) {
                    neighbors = [grid[row - 1][col - 1], grid[row - 1][col], grid[row][col - 1], grid[row + 1][col - 1], grid[row + 1][col]];
                }
            }
            else {
                neighbors = [grid[row - 1][col - 1], grid[row - 1][col], grid[row - 1][col + 1], grid[row][col - 1], grid[row][col + 1], grid[row + 1][col - 1], grid[row + 1][col], grid[row + 1][col + 1]];
            }
            // trueを数える
            let alive = neighbors.filter((cell) => cell).length;

            if (alive === 3) {
                nextGrid[row][col] = true;
            } else if (alive < 2 || alive > 3) {
                nextGrid[row][col] = false;
            } else {
                nextGrid[row][col] = grid[row][col];
            }
        }
    }
    return nextGrid;
}

// 全クライアントにグリッドの状態をブロードキャストする
function broadcast(grid) {
    const message = JSON.stringify({ type: "update", grid });
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// 1秒に10回グリッドを更新し、クライアントに送信する
setInterval(() => {
    if (paused) {
        return;
    }
    grid = updateGrid(grid);
    broadcast(grid);
}, 1000 / FRAME_RATE);
