import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dbServiceObj from "../appwrite/configAppwrite";

// fetch all and specific user posts thunk
export const fetchPosts = createAsyncThunk(
  "postThunk/fecthPosts",
  async (userId, thunkAPI) => {
    try {
      const res = userId
        ? await dbServiceObj.getUserPosts(userId)
        : await dbServiceObj.getAllPosts();
      return res.documents;
    } catch (error) {
      console.log("Error in PostThunk:: ", error);
      throw error;
    }
  }
);

// create new post thunk
// asynTunk just take one argument in the form of object
export const addPost = createAsyncThunk(
  "postThunk/addPost",
  async ({ data, userId }, thunkAPI) => {
    //console.log("value of userId: ", userId);
    try {
      const file = data.image[0]
        ? await dbServiceObj.uploadFile(data.image[0])
        : null;
      const createPost = await dbServiceObj.createPost({
        ...data,
        featuredImage: file ? file.$id : undefined,
        userId: userId,
      });
      return createPost;
    } catch (error) {
      console.log("Error in addPost thunk:: ", error);
      throw error;
    }
  }
);

// Edit PostThunk
export const editPost = createAsyncThunk(
  "postThunk/editPost",
  async ({ data, postDataValue, userId }, thunkAPI) => {
    try {
      const file = data.image[0]
        ? await dbServiceObj.uploadFile(data.image[0])
        : null;
      if (file) {
        await dbServiceObj.deleteFile(postDataValue.featuredImage);
      }
      const updateDbPost = await dbServiceObj.updatePost(postDataValue.$id, {
        ...data, // remaming all data will be spread here like title , content etc
        featuredImage: file ? file.$id : undefined, // but featured Image will be overwrite coz we update it above
      });
      return updateDbPost;
    } catch (error) {
      console.log("Error in edit thunk: ", error);
      throw error;
    }
  }
);

// delete post
export const deletePost = createAsyncThunk(
  "postThunk/deletePost",
  async ({ post, userId }) => {
    try {
      const delPostResponce = await dbServiceObj.deletePost(post.$id);
      if (delPostResponce) {
        await dbServiceObj.deleteFile(post.featuredImage);
        return post;
      }
    } catch (error) {
      console.log("Error in deletePost, PostThunk: ", error);
      throw error;
    }
  }
);

const initialState = {
  posts: [],
  userPosts: {}, // Use an object to store posts for each user
  status: "idle",
  error: null,
};

const postThukn = createSlice({
  name: "postThunk",
  initialState,
  //sync reducers
  reducers: {
    logOut: (state) => {
      state.status = "idle";
      state.posts = [];
      state.userPosts = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.status = "idle";
        } else {
          state.status = "succeeded";
          state.posts = action.payload;
          const userId = action.meta.arg;
          //console.log("user id: ", userId);
          state.userPosts[userId] = action.payload;
          state.error = null;
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.posts = [...state.posts, action.payload];
        const userId = action.meta.arg.userId;

        // this will ensure if posts exist than add the new post at end is
        // user not exist and its his first post than create the new array of userPost and
        // add this post to that array
        state.userPosts[userId] = [
          ...(state.userPosts[userId] || []),
          action.payload,
        ];
        state.error = null;
        //console.log("after state.userPost:: ", state.userPosts);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editPost.pending, (state) => {
        console.log("reducer loading");
        state.status = "loading";
      })
      .addCase(editPost.fulfilled, (state, action) => {
        console.log("reducer fullfiller");
        state.status = "succeeded";
        state.posts = state.posts.map((post) =>
          post.$id === action.payload.$id ? action.payload : post
        );
        const userId = action.meta.arg.userId;
        console.log("userId in edit: ", userId);
        if (userId) {
          state.userPosts[userId] = state.userPosts[userId].map((post) =>
            post.$id === action.payload.$id ? action.payload : post
          );
        }
        state.error = null;
      })
      .addCase(editPost.rejected, (state, action) => {
        console.log("reducer rejected");
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const userId = action.meta.arg.userId;
        if (userId) {
          // use ... operator to maintain the immutability in rudx to make a new copy
          // of the existing array instead of doing work in exiting array
          state.userPosts[userId] = [...state.userPosts[userId]].filter(
            (post) => post.$id !== action.payload.$id
          );
        }
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logOut } = postThukn.actions;

export default postThukn.reducer;
