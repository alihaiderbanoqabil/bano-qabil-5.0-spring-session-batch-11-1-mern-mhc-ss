import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import cakeReducer from './features/cakeSlice'
import userReducer from './features/userSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        cake: cakeReducer,
        user: userReducer
    },
})