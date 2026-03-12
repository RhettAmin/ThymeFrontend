import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface View {
  value: number, 
  path: string
}

// Define a type for the slice state
export interface ViewState {
    activeView: number,
    views: View[]
}

// Define the initial state using that type
const initialState: ViewState = {
  activeView: 0,
  views: [
    {
        value: 0,
        path: "/main"
    },
    {
        value: 1,
        path: "/recipes"
    },
    {
        value: 2,
        path: "/about"
    }
  ]
}

export const ViewSlice = createSlice({
  name: 'ViewSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState,
  reducers: {
    setActiveView: (state, action: PayloadAction<number>) => {
      state.activeView = action.payload
    },
    updateView: (state, action: PayloadAction<View[]>) => {
      state.views = action.payload
    }
  }
})


// Export Methods
export const { setActiveView, updateView } = ViewSlice.actions
export default ViewSlice.reducer