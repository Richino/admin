import { configureStore } from "@reduxjs/toolkit";
import loadingState from "./loadingSlice";

export const store = configureStore({
    reducer: { loading: loadingState },
});
