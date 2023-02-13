import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "dark",
  user: null,
  token: null,
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
