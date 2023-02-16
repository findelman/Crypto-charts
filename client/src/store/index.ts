import { configureStore } from "@reduxjs/toolkit";
import activeToken from "./token";

const store = configureStore({
  reducer: {
    activeToken,
  },
});

export default store;
