// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;
const sound = new Audio("./decision1.mp3");

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

const ws = new WebSocket("ws://localhost:3003");

// サーバからのgrid を canvas に描画する ch15.04-10/ex10/index.js
function renderGrid(grid) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = grid[row][col];
            ctx.beginPath();
            ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
            ctx.fillStyle = cell ? "black" : "white";
            ctx.fill();
            ctx.stroke();
        }
    }
}

// WebSocket からメッセージを受信したときの処理
ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    switch (message.type) {
        case "update":
            console.log("update")
            renderGrid(message.grid);
            break;
        case "pause":
            break;
        case "start":
            break;
    }
});

// 初期化はサーバーの再起動が必要
startButton.addEventListener("click", () => {
    ws.send(JSON.stringify({ type: "start" }));
});

pauseButton.addEventListener("click", () => {
    ws.send(JSON.stringify({ type: "pause" }));
});

// canvas がクリックされたときの処理 (セルの値を反転する) ch15.04-10/ex10/index.js
canvas.addEventListener("click", function (evt) {
    const rect = canvas.getBoundingClientRect();
    const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

    const row = Math.floor(pos.y / RESOLUTION);
    const col = Math.floor(pos.x / RESOLUTION);
    sound.cloneNode().play();
    ws.send(JSON.stringify({ type: "toggle", row, col }));
});
