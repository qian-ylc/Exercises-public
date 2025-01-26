import type { item } from "./ToDoSubmit";

interface Props {
    todoItems: item[];
    setTodoItems: React.Dispatch<React.SetStateAction<item[]>>;
}

export const ToDoList: React.FC<Props> = (props) => {
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const label = e.target.nextElementSibling as HTMLLabelElement;
        label.style.textDecoration = e.target.checked ? "line-through" : "none";
    };
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        const label = e.currentTarget.previousElementSibling as HTMLLabelElement;
        const id = label.getAttribute("id");
        const newTodoItems = props.todoItems.filter((item) => item.id.toString() !== id);
        props.setTodoItems(newTodoItems);
    };
    const divStyle = {
        display: "flex",
        margin: "10px 0",
    }
    return (
        <div>
            <ul>
                {props.todoItems.map(item => {
                    return (
                        <>
                            <div style={divStyle}>
                                <input type="checkbox" onChange={handleCheck} />
                                <label key={item.id} id={item.id.toString()}>
                                    {item.text}
                                </label>
                                <button onClick={handleDelete}>x</button>
                            </div>
                        </>
                    );
                })}
            </ul>
        </div>
    );
};