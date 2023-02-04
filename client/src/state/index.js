import { createSlice } from "@reduxjs/toolkit";
const initialState = { mode: "dark", userId: "63dd41a407e7649b64f9c12c" };
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});
export const { setMode } = globalSlice.actions;
export default globalSlice.reducer;
