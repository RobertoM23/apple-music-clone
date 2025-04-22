import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../../types/Song";

interface PlayerState {
  currentSong: Song | null;
  favorites: Song[];
  isPlaying: boolean;
}

const initialState: PlayerState = {
  currentSong: null,
  favorites: [],
  isPlaying: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    addFavorite: (state, action: PayloadAction<Song>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(song => song.id !== action.payload);
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    }
  },
});

export const { setCurrentSong, addFavorite, removeFavorite, togglePlay } = playerSlice.actions;
export default playerSlice.reducer;
