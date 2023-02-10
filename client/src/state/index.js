import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "dark",
  //userId: "63dd41a407e7649b64f9c12c",
  user: null,
  token: null,
  users:[],
  services:[]
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUsers: (state, action) => {
      state.users = action.payload.users;
    },
  },
});
export const { setMode, setLogin, setLogout } = globalSlice.actions;
export default globalSlice.reducer;
