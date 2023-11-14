import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";

const store = configureStore({
  reducer: {
    authName: authSlice,
    //TODO: for posts
    postName: postSlice,
  },
});

export default store;
