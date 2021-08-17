import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
  name: "list",
  initialState: [],
  reducers: {
    updateList: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateList } = listSlice.actions;

export default listSlice.reducer;
