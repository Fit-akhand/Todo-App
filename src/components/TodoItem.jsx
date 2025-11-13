import React, { useEffect, useRef, useState } from "react";
import { UseTodo } from "../contexts";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { updateTodo, deleteTodo, togle } = UseTodo();

  const inputRef = useRef(null);

  useEffect(() => {
    setTodoMsg(todo.todo);
  }, [todo.todo]);

  useEffect(() => {
    if (isTodoEditable && inputRef.current) {
      inputRef.current.focus();
      const val = inputRef.current.value;
      inputRef.current.setSelectionRange(val.length, val.length);
    }
  }, [isTodoEditable]);

  const editTodo = () => {
    const trimmed = todoMsg.trim();

    if (!trimmed || trimmed === todo.todo) {
      setIsTodoEditable(false);
      setTodoMsg(todo.todo);
      return;
    }
    updateTodo({ ...todo, todo: trimmed }, todo.id);
    setIsTodoEditable(false);
  };

  return (
    <div className={`todo-card ${todo.completed ? "todo-completed" : ""}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={todo.completed}
        onChange={() => togle(todo.id)}
      />

      <input
        ref={inputRef}
        type="text"
        className={`w-full bg-transparent outline-none ${
          todo.completed ? "line-through" : ""
        }`}
        value={todoMsg}
        readOnly={!isTodoEditable}
        onChange={(e) => setTodoMsg(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") editTodo();
          if (e.key === "Escape") {
            setIsTodoEditable(false);
            setTodoMsg(todo.todo);
          }
        }}
      />

      {/* Edit / Save button */}
      <button
        type="button"
        className="icon-btn flex items-center justify-center"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) editTodo();
          else setIsTodoEditable(true);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "💾" : "✏️"}
      </button>

      {/* Delete button */}
      <button
        type="button"
        className="icon-btn flex items-center justify-center"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
