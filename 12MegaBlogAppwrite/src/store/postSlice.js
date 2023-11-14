import { createSlice } from "@reduxjs/toolkit";
import dbServiceObj from "../appwrite/configAppwrite";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "postName",
  initialState,
  reducers: {
    fetchPostsSuccess: (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    },
    fetchPostsPending: (state) => {
      state.status = "loading";
    },
    fetchPostsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logOut: (state) => {
      state.status = "idle";
      state.posts = [];
    },
  },
});

// Async function to fetch posts with or without parameter
export const fetchPosts =
  (userId = null) =>
  async (dispatch) => {
    try {
      dispatch(postSlice.actions.fetchPostsPending());
      const response = userId
        ? await dbServiceObj.getUserPosts(userId)
        : await dbServiceObj.getAllPosts();
      if (response) {
        dispatch(postSlice.actions.fetchPostsSuccess(response.documents));
      } else {
        console.log("problem in getAllPost PostSlice.js::");
        dispatch(postSlice.actions.fetchPostsFailure(error.message));
      }
    } catch (error) {
      dispatch(postSlice.actions.fetchPostsFailure(error.message));
    }
  };

export const { logOut } = postSlice.actions;

export default postSlice.reducer;
