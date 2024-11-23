// ex04のlocalStorageをsessionStorageに変更
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
// taskList: sessionStorage から取得したタスクのリスト、まだは空のリスト
let taskList = [];
// currentId: sessionStorage から取得、まだは0
let currentId = 0;

// あるタブでの変更が他のタブにも自動的に反映される
window.addEventListener("storage", (e) => {
    if (e.key === "taskList") {
        taskList = JSON.parse(e.newValue);
        list.innerHTML = "";
        taskList.forEach(task => {
            appendToDoItem(task);
        });
        currentId = taskList[taskList.length - 1].id + 1;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // ここで sessionStorage からタスク一覧を取得する
    // 取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
    taskList = JSON.parse(sessionStorage.getItem("taskList"));
    console.log(taskList)
    if (taskList) {
        taskList.forEach(task => {
            appendToDoItem(task);
        });
        currentId = taskList[taskList.length - 1].id + 1;
    } else {
        taskList = [];
    }
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
    taskList.push(task);
    appendToDoItem(task);
    sessionStorage.setItem("taskList", JSON.stringify(taskList));
});

// sessionStorage から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
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
        const index = taskList.findIndex((taskInList) => task.id === taskInList.id);
        if (index === -1) {
            console.log("Task not found");
        }
        taskList[index] = task;
        sessionStorage.setItem("taskList", JSON.stringify(taskList));
    });


    const destroy = document.createElement("button");
    // destroy がクリック (click) された場合に task を taskList から削除し、elem を削除
    destroy.textContent = "削除";
    destroy.addEventListener("click", async () => {
        const index = taskList.findIndex((taskInList) => task.id === taskInList.id);
        if (index === -1) {
            console.log("Task not found");
        }
        taskList.splice(index, 1);
        sessionStorage.setItem("taskList", JSON.stringify(taskList));
        elem.remove();
    });

    // TODO: elem 内に toggle, label, destroy を追加しなさい
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    list.append(elem);
}
