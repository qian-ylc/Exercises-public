const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.form = this.shadowRoot.querySelector("#new-todo-form");
        // TODO: 残りを実装
        // ch15.01-03 での内容を使う
        this.input = this.shadowRoot.querySelector("#new-todo");
        let list = this.shadowRoot.querySelector("#todo-list");
        let button = this.shadowRoot.querySelector("button");

        button.onclick = (event) => {
            event.preventDefault();
            if (this.input.value.trim() === "") {
                return;
            }
            const todo = this.input.value.trim();
            this.input.value = "";

            const elem = document.createElement("li");

            const label = document.createElement("label");
            label.textContent = todo;
            label.style.textDecorationLine = "none";

            const toggle = document.createElement("input");
            toggle.type = "checkbox";
            toggle.addEventListener("change", (e) => {
                label.style.textDecorationLine = e.target.checked ? "line-through" : "none";
            });

            const destroy = document.createElement("button");
            destroy.textContent = "❌";
            destroy.addEventListener("click", () => {
                elem.remove();
            });

            list.prepend(elem);
            elem.append(toggle, label, destroy);
        }
    }
}

customElements.define("todo-app", TodoApp);
