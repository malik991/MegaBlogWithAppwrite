//to crate a store first f all  get configure store method
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Features/todoSlice/todoSlice.js";

// now just crate a store

// most of the time it will take an obj. after import reducer pass it into store
export const store = configureStore({
  reducer: todoReducer,
});

//1: after store now we will create reducer/functions
//2: in reduc toolkkit we call it slicers
//3: crate a features folder where diferent features
//   can be place i.e todo, login , product etc
