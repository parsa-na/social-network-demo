import { createSlice } from "@reduxjs/toolkit";

export const toggleRenderSlice = createSlice({
  name: "toggleRender",
  initialState: {
    toggleRender: false,
  },
  reducers: {
    toggleRenderFunc: (state) => {
      state.toggleRender = !state.toggleRender;
    },
  },
});

export const { toggleRenderFunc } = toggleRenderSlice.actions;
export default toggleRenderSlice.reducer;
