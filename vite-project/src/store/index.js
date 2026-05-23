import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import cakeReducer from './features/cakeSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        cake: cakeReducer
    },
})