import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    value: false,
};

export const openState = createSlice({
    name: "open",
    initialState,
    reducers: {
        open: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { open } = openState.actions;
export default openState.reducer;
