import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    value: false,
};

export const loadingState = createSlice({
    name: "load",
    initialState,
    reducers: {
        load: (state, action) => {
            state.value = action.payload;
            console.log(current(state));
        },
    },
});

export const { load } = loadingState.actions;
export default loadingState.reducer;
