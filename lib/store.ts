import { configureStore } from '@reduxjs/toolkit'
import ViewReducer from './features/view/viewSlice'

export const Store = configureStore({
  reducer: {
    ViewController: ViewReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch