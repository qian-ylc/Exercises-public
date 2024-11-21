const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
    // TODO: ここで API を呼び出してタスク一覧を取得し、
    // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい

    // modeとcredentialsを指定してfetchを行う
    try {
        let response = await fetch('http://localhost:3001/api/tasks', { mode: 'cors', credentials: 'include' });
        if (!response.ok) {
            let message = await response.json()
            alert(message.message);
        } else {
            let tasks = await response.json(); // bodyを読み出す
            tasks.items.forEach(task => {
                appendToDoItem(task);
            });
        }
    } catch (e) {
        alert(e);
    }
});

form.addEventListener("submit", async (e) => {
    // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
    // ページがリロードされてしまうため
    e.preventDefault();

    // 両端からホワイトスペースを取り除いた文字列を取得する
    const todo = input.value.trim();
    if (todo === "") {
        return;
    }

    // new-todo の中身は空にする
    input.value = "";

    // TODO: ここで API を呼び出して新しいタスクを作成し
    // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
    try {
        let response = await fetch("http://localhost:3001/api/tasks", { mode: 'cors', credentials: 'include', method: "POST", body: JSON.stringify({ name: todo }) });
        if (!response.ok) {
            let message = await response.json()
            alert(message.message);
        } else {
            let task = await response.json();
            appendToDoItem(task);
        }
    } catch (e) {
        alert(e);
    }

});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
    // ここから #todo-list に追加する要素を構築する
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = task.name;
    label.style.textDecorationLine = "none";

    const toggle = document.createElement("input");
    // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
    // 成功したら label.style.textDecorationLine を変更しなさい

    toggle.type = "checkbox";
    // 既有タスクの状態を読み取る
    if (task.status === "completed") {
        toggle.checked = true;
        label.style.textDecorationLine = "line-through";
    }

    // タスクを更新する場合
    toggle.addEventListener("change", async () => {
        let status = "";
        if (toggle.checked) {
            status = "completed";
        } else {
            status = "active";
        }
        try {
            let response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, { mode: 'cors', credentials: 'include', method: "PATCH", body: JSON.stringify({ status: status }) });
            if (!response.ok) {
                let message = await response.json()
                alert(message.message);
            } else {
                label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
            }
        } catch (e) {
            alert(e);
        }
    });


    const destroy = document.createElement("button");
    // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
    // 成功したら elem を削除しなさい
    destroy.textContent = "削除";
    destroy.addEventListener("click", async () => {
        try {
            let response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, { mode: 'cors', credentials: 'include', method: "DELETE" });
            if (!response.ok) {
                alert(response.error);
            } else {
                elem.remove();
            }
        } catch (e) {
            alert(e);
        }
    });

    // TODO: elem 内に toggle, label, destroy を追加しなさい
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    list.prepend(elem);
}
