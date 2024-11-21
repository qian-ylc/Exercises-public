import { retryWithExponentialBackoff } from "./retryWithExpontialBackoff.js";

const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

function fetchWithTimeout(url, options = {}) {
    if (options.timeout) { // timeoutが存在し、値がゼロではない場合、
        let controller = new AbortController(); // コントローラを作成する。
        options.signal = controller.signal; // signalプロパティを設定する。

        // 指定したミリ秒が経過した後に中止シグナルを送信するタイマーを
        // 開始する。なお、このタイマーをキャンセルすることはない。fetchが
        // 完了した後にabort()を呼び出しても問題はない。
        setTimeout(() => {
            controller.abort();
        }, options.timeout);
    }
    // ここでは通常のfetchを行うだけ。
    return fetch(url, options);
}

document.addEventListener("DOMContentLoaded", async () => {
    // TODO: ここで API を呼び出してタスク一覧を取得し、
    // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
    let response;
    try {
        response = await fetchWithTimeout('/api/tasks', { timeout: 3000 })
        let tasks = await response.json();
        tasks.items.forEach(task => {
            appendToDoItem(task);
        });
        console.log("success task")
    } catch (e) {
        if (response && response.status === 500) {
            console.log("500 catch")
            // 500 番台のエラーレスポンスが返ってきた場合は retryWithExponentialBackoff を流用
            retryWithExponentialBackoff(async () => {
                response = await fetchWithTimeout('/api/tasks', { timeout: 3000 })
                if (response.ok) {
                    let tasks = await response.json();
                    tasks.items.forEach(task => {
                        appendToDoItem(task);
                    });
                    console.log("success task")
                    return "ok";
                } else if (!response) {
                    return "timeout";
                }
            })
        } else {
            // タイムアウトの場合
            alert(e)
        }
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
    let response;
    try {
        response = await fetchWithTimeout("/api/tasks", { timeout: 3000, method: "POST", body: JSON.stringify({ name: todo }) })
        if (response.ok) {
            let task = await response.json();
            appendToDoItem(task);
            console.log("success submit")
        }
    } catch (e) {
        if (response && response.status === 500) {
            console.log("500 catch")
            // 500 番台のエラーレスポンスが返ってきた場合は retryWithExponentialBackoff を流用
            retryWithExponentialBackoff(async () => {
                response = await fetchWithTimeout("/api/tasks", { timeout: 3000, method: "POST", body: JSON.stringify({ name: todo }) })
                if (response.ok) {
                    let task = await response.json();
                    appendToDoItem(task);
                    console.log("success submit")
                    return "ok";
                } else if (!response) {
                    return "timeout";
                }
            })
        } else {
            // タイムアウトの場合
            alert(e)
        }
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

        let response;
        try {
            response = await fetchWithTimeout(`/api/tasks/${task.id}`, { timeout: 3000, method: "PATCH", body: JSON.stringify({ status: status }) });
            if (response.ok) {
                label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
                console.log("success change")
            }
        } catch (e) {
            if (response && response.status === 500) {
                console.log("500 catch")
                // 500 番台のエラーレスポンスが返ってきた場合は retryWithExponentialBackoff を流用
                retryWithExponentialBackoff(async () => {
                    response = await fetchWithTimeout(`/api/tasks/${task.id}`, { timeout: 3000, method: "PATCH", body: JSON.stringify({ status: status }) });
                    if (response.ok) {
                        label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
                        console.log("success change")
                        return "ok";
                    } else if (!response) {
                        return "timeout";
                    }
                })
            } else {
                // タイムアウトの場合
                alert(e)
            }
        }
    });


    const destroy = document.createElement("button");
    // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
    // 成功したら elem を削除しなさい
    destroy.textContent = "削除";
    destroy.addEventListener("click", async () => {
        let response;
        try {
            response = await fetchWithTimeout(`/api/tasks/${task.id}`, { timeout: 3000, method: "DELETE" });
            if (response.ok) {
                elem.remove();
                console.log("success delete")
            }
        } catch (e) {
            if (response && response.status === 500) {
                console.log("500 catch")
                // 500 番台のエラーレスポンスが返ってきた場合は retryWithExponentialBackoff を流用
                retryWithExponentialBackoff(async () => {
                    response = await fetchWithTimeout(`/api/tasks/${task.id}`, { timeout: 3000, method: "DELETE" });
                    if (response.ok) {
                        elem.remove();
                        console.log("success delete")
                        return "ok";
                    } else if (!response) {
                        return "timeout";
                    }
                })
            } else {
                // タイムアウトの場合
                alert(e)
            }
        }
    });

    // TODO: elem 内に toggle, label, destroy を追加しなさい
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    list.prepend(elem);
}
