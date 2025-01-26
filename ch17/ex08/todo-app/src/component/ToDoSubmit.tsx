
import { useState } from "react";
import { ToDoList } from "./ToDoList";

export type item = {
    id: number;
    text: string;
}

export const ToDoSubmit: React.FC = () => {
    const [todoItems, setTodoItems] = useState<item[]>([]);
    const [id, setId] = useState<number>(0);
    // itemを追加
    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        const newTodo = document.getElementById("new-todo") as HTMLInputElement;
        setTodoItems([...todoItems, { id: id, text: newTodo.value }]);
        newTodo.value = "";
        setId(id + 1);
    };
    const formStyle = {
        margin: "10px",
        padding: "5px",
    }
    return (
        <>
            <form id="new-todo-form" style={formStyle}>
                <input type="text" id="new-todo" placeholder="What needs to be done?" />
                <button onClick={handleSubmit}>Add</button>
            </form>
            <ToDoList todoItems={todoItems} setTodoItems={setTodoItems} />
        </>
    );
};