"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
    e.preventDefault();
    getMessageFromServer();

});
async function getMessageFromServer() {
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.textContent = "";
    messageContainer.appendChild(messageElement);

    // TODO: ここにサーバーとのやり取り等を実装しなさい
    let message = new EventSource("/message");
    // 通信開始、ボタンを無効化
    button.disabled = true;
    // イベントフィールドを持たないケース？
    message.onmessage = (event) => {
        const data = JSON.parse(event.data);
        messageContainer.appendChild(messageElement);
        messageElement.textContent = data.value;
        // さようならを受け取ったら通信を終了する
        if (data.done) {
            message.close();
            // 通信終了、ボタンを有効化
            button.disabled = false;
        }
    };



}
