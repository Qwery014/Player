import { createSlice } from '@reduxjs/toolkit'
import { backgrounds, trackList } from "../../components/consts";

const backgroundLocal = localStorage.getItem("Qwery014.Player")

const initialState = {
  burger: false,
  trackList: trackList,
  trackId: 0,
  blur: 50,
  theme: backgroundLocal ? JSON.parse(backgroundLocal) : backgrounds[0],
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
      state.burger = false;
    },
    // 
    setBlur: (state, action) => {
      state.blur = action.payload;
    },
    setTheme: (state, action) => {
      localStorage.setItem("Qwery014.Player", JSON.stringify(action.payload));
      state.theme = action.payload;
    }
  },
})

export const {
  clickBurger,
  searching,
  switchTrack,
  setBlur,
  setPlayerColor,
  setTheme,
} = styleSlice.actions

export default styleSlice.reducer