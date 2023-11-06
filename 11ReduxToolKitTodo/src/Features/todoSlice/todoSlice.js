import { createSlice, nanoid } from "@reduxjs/toolkit";
// createSlice is a mthod which used for slice creation
// nanoid is used just for to generate the unique id may be in db we will not used

// now first of all we will initilize our store here may be in DB we can
// get data from db but here we create an object coz in obj we can get multiple things

const initialState = {
  todos: [{ id: 1, text: "hello world", selected: false }],
  selectedTodo: null, // Initialize selectedTodo to null
};

// now we will create a slice , slice is a bigger version of reducer
// and reducre is just a function
export const todoSlice = createSlice({
  // we will pass an object in most cases
  // now we will crate a name for slice and remember this name it will use in redux debugger
  name: "todo", // here 'name' is the conventional property in RTK
  initialState, // every slice has an initial state and we can crate multiple slices
  // now we will create reducer for store completion
  reducers: {
    // here we will pass properties and our functions
    // here will define and decalre of function not like context api where just we declare the functions
    // here in reducer in every function we have two props 'state' and 'action'
    addTodo: (state, action) => {
      // state provide current instialState situation, action provide us the paramter of the function like id
      const todo = {
        id: nanoid(), // geenrate unique id
        text: action.payload, // here payload is obj from which we can extract mutiple vaues
      };
      console.log("in reducer: ", action.payload);
      state.todos.push(todo); // now push new todo in all todos obj or array by the state
    },
    removeTodo: (state, action) => {
      console.log("remove function: ", action.payload);
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    updateTodo: (state, action) => {
      console.log("update function", action.payload);
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    },

    selectTodo: (state, action) => {
      console.log("in SelectedTod: ", action.payload);
      state.selectedTodo = action.payload;
      //console.log(selectTodo.text);
    },
    clearSelectedTodo: (state) => {
      state.selectedTodo = null;
    },
  },
});

// however complete slice is export but due to sytex of RTK , we hv to export the
// each reducers / function sepratly coz at the end we just call these function
//where we need. like use them direct in component

export const {
  addTodo,
  removeTodo,
  updateTodo,
  selectTodo,
  clearSelectedTodo,
} = todoSlice.actions;

// now we will export/registers our reducers in our store otherwise it will not allow to update
// values in store variables

export default todoSlice.reducer;
