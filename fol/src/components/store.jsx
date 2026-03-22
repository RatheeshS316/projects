import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // ✅ fixed import

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
