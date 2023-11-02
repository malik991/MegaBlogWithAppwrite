import { createContext, useContext, useState } from "react";

export const TodoContext = createContext({
  // todo properties
  todos: [
    {
      id: 1,
      title: "my default todo",
      checked: false,
    },
  ],
  // todo fucntionalities
  addTodo: (title) => {},
  updateTodo: (id, title) => {},
  deleteTodo: (id) => {},
  toggleChecked: (id) => {},
});

export const UseTodoContext = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
