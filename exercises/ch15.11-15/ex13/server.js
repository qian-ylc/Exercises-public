import WebSocket, { WebSocketServer } from "ws";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import url from "node:url";

const port = 3003;
const wss = new WebSocketServer({ port });

wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
        console.log(`Received: ${message}`);
        // http://localhost:11434/には「Ollama is running」が表示されるが、fetchできない (curlができる)
        // TypeError: fetch failed errno: -61,code: 'ECONNREFUSED',syscall: 'connect',address: '::1',port: 11434
        const answerResponse = await fetch("http://localhost:11434/api/post", {
            method: "POST", body: JSON.stringify({
                model: "gemma:2b",
                messages: [
                    {
                        "role": "user",
                        "content": "hello",
                    }
                ]
            })
        })
        const answer = await answerResponse.json();
        console.log(`Answer: ${answer}`);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(answer);
            }
        });
    });

    ws.send("Welcome to the chat!");
});
console.log("WebSocket server is running on ws://localhost:3003");

async function streamBody(response) {
    let reader = response.body.getReader();
    let body = "";
    while (done === "false") {
        let { done, message } = await reader.read();
        if (message) {
            body += decoder.decode(message.content, { stream: true });
        }
        if (done) {
            break;
        }
    }

    return body; // 結合したボディテキストを返す。
}