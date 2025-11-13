import { useState } from "react";
import { UseTodo } from "../contexts";

function TodoForm() {
  const [todo, setTodo] = useState("");

  const { addTodo } = UseTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;

    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={add} className="flex gap-2">
      <input
        type="text"
        placeholder="Write Todo..."
        className="todo-input w-full"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <button type="submit" className="add-btn px-4 py-2">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
