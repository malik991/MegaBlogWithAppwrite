import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";
import postThunkSlice from "./postThunkSlice";

const store = configureStore({
  reducer: {
    authName: authSlice,
    //TODO: for posts
    //postName: postSlice,
    postThunk: postThunkSlice,
  },
});

export default store;
