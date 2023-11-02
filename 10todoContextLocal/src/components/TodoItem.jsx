import React, { useState } from "react";
//import UseTodoContext from "../contexts/todoContext";
import { UseTodoContext } from "../contexts";
function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  // todo is destructure we are passing in above paramater which receive from
  // UseTodocontext as an object
  const [todoTitle, setTodoTitle] = useState(todo.title);
  // desruct the context function
  const { updateTodo, deleteTodo, toggleChecked } = UseTodoContext();

  //edit todo
  const editTodo = () => {
    // 1: get the id of specific todo , 2: pass the todo object not like todo just its a js obj
    // 3: spread the complete obj and just update the title which required
    updateTodo(todo.id, { ...todo, title: todoTitle });
    setIsTodoEditable(false);
  };

  // toggle checked
  const toggleComplete = () => {
    toggleChecked(todo.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.checked ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.checked}
        onChange={toggleComplete}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.checked ? "line-through" : ""}`}
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.checked) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.checked}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
