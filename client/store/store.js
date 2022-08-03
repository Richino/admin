import { configureStore } from "@reduxjs/toolkit";
import openState from "./openSlice";

export const store = configureStore({
    reducer: { opening: openState },
});
