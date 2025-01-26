'use client'
import { ToDoSubmit } from "@/component/ToDoSubmit";

// ToDoSubmit -> ToDoList
// ToDoSubmitに、toDoItemsとsetToDoItemsを管理する
// ToDoSubmitからToDoListに、toDoItemsとsetToDoItemsを渡す
export default function Home() {
  return (
    <>
      <ToDoSubmit>

      </ToDoSubmit>
    </>
  );
}
