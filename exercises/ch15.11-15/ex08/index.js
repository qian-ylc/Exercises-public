// 引数としてリクエスト本文を受け取り、返り値としてレスポンス本文が得られる Promise<string> を返すこと。
// 一定時間内にレスポンスを受信したら、Promise が resolve されること。
// 一定時間経過時にタイムアウトし、Promise が reject されること。
// WebSocket の接続が切断した場合、Promise が reject されること。

const form = document.querySelector("#request-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll("input");
    const requests = [];
    inputs.forEach(input => {
        if (input.value) {
            requests.push(input.value);
        }
    })
    if (requests.length === 0) {
        return;
    }
    await sendRequest(requests);
});

async function sendRequest(requests) {
    // 並行して複数のリクエストを送信
    // ws.onmessageはどのように複数のリクエストに対応するのかわからなくて、requestごとにPromiseを返す/Websocketを作るようにした
    // -> 解決できなかったみたい。「どのリクエストに対するレスポンスか、リクエストした側で判別できるように」
    // requests.forEach(request => {
    //     return new Promise((resolve, reject) => {
    //         const ws = new WebSocket('ws://localhost:3003');
    //         // WebSocket の接続が切断した場合、Promise が reject される?
    //         if (ws.readyState === WebSocket.CLOSED) {
    //             reject("WebSocket closed");
    //             return;
    //         }
    //         ws.onopen = () => {
    //             ws.send(request);
    //         }
    //         // レスポンスを受信
    //         ws.onmessage = async (event) => {
    //             if (event.data === request)
    //                 await receiveResponse(ws).then((response) => {
    //                     console.log(response);
    //                     resolve(response);
    //                 });
    //         }
    //     }
    //     );
    // });

    const ws1 = new WebSocket('ws://localhost:3003');
    const ws2 = new WebSocket('ws://localhost:3003');
    const ws3 = new WebSocket('ws://localhost:3003');
    ws1.onopen = () => {
        ws1.send(requests[0]);
    }
    ws2.onopen = () => {
        ws2.send(requests[1]);
    }
    ws3.onopen = () => {
        ws3.send(requests[2]);
    }
    ws1.onmessage = async (event) => {
        await receiveResponse(ws1).then((response) => {
            const label1 = document.querySelector("#response1");
            label1.textContent = response;
        })
    }
    ws2.onmessage = async (event) => {
        await receiveResponse(ws2).then((response) => {
            const label2 = document.querySelector("#response2");
            label2.textContent = response;
        })
    }
    ws3.onmessage = async (event) => {
        await receiveResponse(ws3).then((response) => {
            const label3 = document.querySelector("#response3");
            label3.textContent = response
        })
    }
}

// 別の WebSocket 接続で、WebSocket サーバから転送されたリクエストメッセージを受信してレスポンスを返す実装
async function receiveResponse(ws) {
    return new Promise((resolve, reject) => {
        ws.onmessage = (event) => {
            resolve("Hello, " + event.data);
        }
    });
}

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}