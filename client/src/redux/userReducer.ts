import { createSlice } from "@reduxjs/toolkit";
import { User } from "../lib/definition";

const initialState = JSON.parse(localStorage.getItem("user") || "{}") as User;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth(state, action: { payload: User }) {
      state = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state = {} as User;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
