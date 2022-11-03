import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import toggleRenderReducer from "./features/toggleRender/toggleRenderSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    toggleRender: toggleRenderReducer,
  },
});
