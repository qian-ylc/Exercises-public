// ch15.11-15.1のindex.jsを改造

const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// タスクの情報を保持するクラス
class Task {
    constructor(id, name, status) {
        this.id = id;
        this.name = name;
        this.status = status;
    }
}
// currentId: indexedDB から取得、まだは0
let currentId = 0;

// データベースを開く。データ追加、変更などの場合、データベースを開く必要がある
function openDatabase() {
    return new Promise((resolve, reject) => {
        // todoList という名前のデータベースを開く
        const request = indexedDB.open("todoList", 1);
        request.onupgradeneeded = event => {
            const db = event.target.result;
            // todos という名前のオブジェクトストアを作成
            // id でタスクを一意に識別する
            db.createObjectStore("todos", { keyPath: "id" });
        };
        request.onsuccess = event => {
            resolve(event.target.result);
        };
        request.onerror = event => {
            reject(event.target.error);
        };
    });
}

// indexedDB から全てのタスクを取得する
function getAllToDoItems(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("todos", "readonly");
        const store = transaction.objectStore("todos");
        const request = store.getAll();
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(request.error);
        };
    });
}

function addToDoItem(db, item) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("todos", "readwrite");
        const store = transaction.objectStore("todos");
        console.log(item)
        const request = store.add(item);
        request.onsuccess = () => {
            resolve();
        };
        request.onerror = () => {
            reject(request.error);
        };
    });
}

function updateToDoItem(db, item) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("todos", "readwrite");
        const store = transaction.objectStore("todos");
        const id = item.id;
        const status = item.status;
        // keyPath である id で item を取得
        const request = store.get(id);
        request.onsuccess = () => {
            const item = request.result;
            item.status = status;
            // item の status を更新し、データベースに保存
            const updateRequest = store.put(item);
            updateRequest.onsuccess = () => {
                resolve();
            };
            updateRequest.onerror = () => {
                reject(updateRequest.error);
            };
        };
        request.onerror = () => {
            reject(request.error);
        }
    });
}

function deleteToDoItem(db, item) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("todos", "readwrite");
        const store = transaction.objectStore("todos");
        const id = item.id;
        const request = store.delete(id);
        request.onsuccess = () => {
            resolve();
        };
        request.onerror = () => {
            reject(request.error);
        };
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // indexedDB からタスク一覧を取得する、まだはデータベースを作る
    // 取得したタスクを appendToDoItem で ToDo リストの要素として追加
    openDatabase().then(db => {
        console.log(db)
        getAllToDoItems(db).then(items => {
            items.forEach(task => {
                appendToDoItem(task);
            });
            // indexdbにタスクリストが存在したら、currentId を更新
            if (items.length > 0) {
                currentId = items[items.length - 1].id + 1;
            }
        });

    });
});

form.addEventListener("submit", (e) => {
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

    // 新しいタスクを作成し、appendToDoItem で ToDo リストの要素として追加しなさい
    let task = new Task(currentId++, todo, "active");
    appendToDoItem(task);
    openDatabase().then(db => {
        addToDoItem(db, task);
    });
});

function appendToDoItem(task) {
    // ここから #todo-list に追加する要素を構築する
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = task.name;
    label.style.textDecorationLine = "none";

    const toggle = document.createElement("input");
    // toggle が変化 (change) した際に task の状態を更新し、label.style.textDecorationLine を変更

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
            label.style.textDecorationLine = "line-through";
        } else {
            status = "active";
            label.style.textDecorationLine = "none";
        }
        task.status = status;
        openDatabase().then(db => {
            updateToDoItem(db, task);
        });
    });


    const destroy = document.createElement("button");
    // destroy がクリック (click) された場合に task を taskList から削除し、elem を削除
    destroy.textContent = "削除";
    destroy.addEventListener("click", async () => {
        openDatabase().then(db => {
            deleteToDoItem(db, task);
        });
        elem.remove();
    });

    // TODO: elem 内に toggle, label, destroy を追加しなさい
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    list.append(elem);
}
