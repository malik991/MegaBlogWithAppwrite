import React, { useState, useEffect } from "react";
// import dispatchwhich come from react, not redux function
import { useDispatch, useSelector } from "react-redux";
// import individual reducer from our slice
import {
  addTodo,
  updateTodo,
  clearSelectedTodo,
} from "../Features/todoSlice/todoSlice.js";
// addTodo will add or send data to our store using Dispatch

function AddTodo() {
  const [todo, setTodo] = useState("");
  // create a dispatch variable which use a reducer and add value in store
  const dispatch = useDispatch();

  const selectedTodo = useSelector((state) => state.selectedTodo);
  //console.log("enter in select", selectedTodo);
  useEffect(() => {
    if (selectedTodo) {
      setTodo(selectedTodo.text);
    }
  }, [selectedTodo]);

  function addTodoHandler(e) {
    e.preventDefault();
    //console.log("from addTodo.jsx: ", todo);
    //dispatch(addTodo(todo)); // dispatch use reducer addTodo and send data to store
    //setTodo("");
    if (selectedTodo) {
      dispatch(updateTodo({ id: selectedTodo.id, text: todo }));
      dispatch(clearSelectedTodo()); // Clear the selectedTodo after updating
    } else {
      dispatch(addTodo(todo));
    }

    setTodo("");
  }
  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      {selectedTodo ? (
        <input
          type="text"
          className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Edit Todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter a Todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      )}

      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {selectedTodo ? "Update" : "Add Todo"}
      </button>
    </form>
  );
}

export default AddTodo;
