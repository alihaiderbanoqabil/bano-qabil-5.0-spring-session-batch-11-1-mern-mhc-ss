import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    numOfCakes: 20,
};

export const cakeSlice = createSlice({
    initialState: initialState,
    name: "cake",
    reducers: {
        ordered: (state, action) => {
            state.numOfCakes--;
        },
        restocked: (state, action) => {
            state.numOfCakes = state.numOfCakes + action.payload;
        },
    },
});

export default cakeSlice.reducer;
const { ordered, restocked } = cakeSlice.actions
// export const cakeActions = cakeSlice.actions;