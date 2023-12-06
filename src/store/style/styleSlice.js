import { createSlice } from '@reduxjs/toolkit'
import { trackList } from "../../components/consts";

const initialState = {
  burger: false,
  trackList: trackList,
  trackId: 0,
}

export const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    clickBurger: (state) => {
      state.burger = !state.burger;
    },
    // 
    searching: (state, action) => {
      const res = trackList.filter((item) => {
        return item.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.author.toLowerCase().includes(action.payload.toLowerCase());
      });

      state.trackList = [...res];
    },
    // 
    switchTrack: (state, action) => {
      state.trackId = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  clickBurger,
  searching,
  switchTrack,
} = styleSlice.actions

export default styleSlice.reducer