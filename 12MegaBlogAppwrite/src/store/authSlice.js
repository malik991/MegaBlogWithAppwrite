import { createSlice } from "@reduxjs/toolkit";

// track the user authentication by this store

//inital state
const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "authName",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
