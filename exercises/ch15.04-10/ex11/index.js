const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
const todos = [];

function renderTodos(todos) {
    console.log(todos)
    list.innerHTML = "";
    const hash = location.hash;

    todos.forEach((todo, index) => {
        const clone = template.content.cloneNode(true);
        const li = clone.querySelector("li");
        const toggle = clone.querySelector("input");
        const label = clone.querySelector("label");
        const destroy = clone.querySelector("button");

        li.classList.toggle("completed", todo.completed);
        toggle.addEventListener("change", () => {
            todo.completed = toggle.checked;
            // Activeの場合、チェックつけたものをCompletedに移動
            // Completedの場合、チェック外したものをActiveに移動
            if (hash === '#/active' && todo.completed) {
                todos.splice(index, 1);
            } else if (hash === '#/completed' && !todo.completed) {
                todos.splice(index, 1);
            }
            renderTodos(todos);
        });
        label.textContent = todo.content;
        toggle.checked = todo.completed;

        // ActiveやCompletedに実行された削除操作がAllにも反映されるため、フルtodoをアクセス必要がありそう
        destroy.addEventListener("click", () => {
            todos.splice(index, 1);
            renderTodos(todos);
        });

        list.appendChild(li);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.trim() === "") {
        return;
    }
    const todo = input.value.trim();
    input.value = "";

    todos.push({ content: todo, completed: false });
    renderTodos(todos);
});

window.addEventListener("hashchange", () => {
    // ここを実装してね
    const hash = location.hash;
    if (hash === '#/active') {
        renderTodos(todos.filter(todo => !todo.completed));
    } else if (hash === '#/completed') {
        renderTodos(todos.filter(todo => todo.completed));
    } else {
        renderTodos(todos);
    }
});
