import { createSlice } from "@reduxjs/toolkit";
import { User } from "../lib/definition";

const initialState = localStorage.getItem("user")
  ? (JSON.parse(localStorage.getItem("user") || "") as User)
  : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth(state, action: { payload: User }) {
      state = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state = null;
      localStorage.removeItem("user");
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
