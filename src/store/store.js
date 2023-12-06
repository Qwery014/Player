import { configureStore } from '@reduxjs/toolkit'
import styleReducer from './style/styleSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer
  },
})