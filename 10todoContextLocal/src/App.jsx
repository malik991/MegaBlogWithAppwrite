import { TodoProvider } from "./contexts";
import "./App.css";
import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]); // pass an empty array

  // define methods of contexta remeber function signature are case sensitive
  function addTodo(todo) {
    // add previous values/array contents usig spread operator like in JS
    // {id: Date.now(), ...todo} coz todo is our object define in context wo
    // we have to mentioned each property of an object here id should be unique
    // so we mentioned it and remaingn all properties are spread here instead of
    // write each property separatly
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((everyItem) => (everyItem.id === id ? todo : everyItem))
    );
  };

  const deleteTodo = (id) => {
    // for delteion we have to create a new array in which the specific id element
    // will not be included
    setTodos((prev) => prev.filter((eachItem) => eachItem.id !== id));
  };

  const toggleChecked = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  // load you data
  useEffect(() => {
    //in localstorage first of all you should getItem first and convert it into json
    const todos = JSON.parse(localStorage.getItem("todoItem"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // we can use multiple todos , now we will set the local storage
  useEffect(() => {
    // now rememebr in local storage key name should be same as it is in getItem above
    // 1 more thing, as we know in key value pair value should be in string formate but
    // we have array formate in todos context so we will stringify it convert into string
    localStorage.setItem("todoItem", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleChecked }}
    >
      <div className="bg-[#112a4f] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div className="w-full" key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
