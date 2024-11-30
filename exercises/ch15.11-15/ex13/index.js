const ws = new WebSocket("ws://localhost:3003");

ws.onopen = () => {
    console.log("Connected to the WebSocket server");
};

ws.onmessage = (event) => {
    const chat = document.getElementById("chat");
    const message = document.createElement("div");
    message.textContent = event.data;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
};

ws.onclose = () => {
    console.log("Disconnected from the WebSocket server");
};

const input = document.getElementById("message");
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const message = input.value;
        ws.send(message);
        input.value = "";
    }
});