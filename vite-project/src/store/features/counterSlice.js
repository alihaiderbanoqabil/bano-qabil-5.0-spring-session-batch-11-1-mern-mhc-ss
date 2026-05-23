import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 0 }

export const counterSlice = createSlice({
    initialState: initialState,
    name: 'counter',
    reducers: {
        increment: (state) => {
            // console.log(state, "state");

            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // state.value += 1
            state.value = state.value + 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            console.log(state, "state");
            console.log(action, "action");

            state.value += action.payload
        },
        decrementByAmount: (state, action) => {
            state.value -= action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, decrementByAmount } = counterSlice.actions

export default counterSlice.reducer