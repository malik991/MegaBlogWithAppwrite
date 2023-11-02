import React, { useState } from "react";
//import UseTodoContext from "../contexts/todoContext";
import { UseTodoContext } from "../contexts";
function TodoForm() {
  // now we will talk about individual todo
  const [todo, setTodo] = useState("");
  // now we will just call our hook from context and extract what we want
  const { addTodo } = UseTodoContext();

  // handle add
  const handleAdd = (e) => {
    e.preventDefault();
    if (!todo) return;
    // otherwise pass an object of array because in defination of addTodo we use object in array
    // here we do not mention id coz in defination of addTodo we already define it. however we can pas it through her
    addTodo({ title: todo, checked: false });
    setTodo("");
  };
  return (
    <form onSubmit={handleAdd} className="flex">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
