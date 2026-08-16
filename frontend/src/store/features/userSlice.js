import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  users: [],
  error: '',
  total: 0,
};

const TOKEN = import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN;
console.log(TOKEN, "TOKEN");

export const fetchUsers = createAsyncThunk('user/fetchUsers', (query) => {
  console.log(query, "query");

  return axios(
    query ? `https://api.github.com/search/users?q=${query}&per_page=100` : 'https://api.github.com/users?since=0&per_page=100',
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${TOKEN}`,
      }
    }).then(({ data }) => {
      console.log(data, "data");
      // return data
      return query ?
        {
          users: data?.items,
          total: data?.total_count
        } :
        // {
        //   users: data,
        //   total: 0
        // }
        data
    })
    .catch((error) => {
      console.log(error, "error");

      return error.message
    });
})


const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      console.log(payload, "payload");
      state.error = "";
      state.isLoading = false;
      if (Array.isArray(payload)) {
        state.users = payload;
      } else {
        state.users = payload["users"];
        state.total = payload["total"];
      }
      // state.users = payload["users"];
      // state.total = payload["total"];
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;