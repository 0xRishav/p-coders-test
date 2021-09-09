import { createSlice } from "@reduxjs/toolkit";
import moviePage1 from "../../api/CONTENTLISTINGPAGE-PAGE1.json";
import moviePage2 from "../../api/CONTENTLISTINGPAGE-PAGE2.json";
import moviePage3 from "../../api/CONTENTLISTINGPAGE-PAGE3.json";

const initialState = {
  pageNum: 1,
  movies: [],
  filteredMovies: [],
  searchText: "",
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    loadMovies: (state) => {
      if (state.pageNum === 1) {
        console.log("loaded 1");
        state.movies = [
          ...state.movies,
          ...moviePage1.page["content-items"].content,
        ];
      } else if (state.pageNum === 2) {
        console.log("loaded 2");
        state.movies = [
          ...state.movies,
          ...moviePage2.page["content-items"].content,
        ];
      } else if (state.pageNum === 3) {
        console.log("loaded 3");
        state.movies = [
          ...state.movies,
          ...moviePage3.page["content-items"].content,
        ];
      }
      // switch (state.pageNum) {
      //   case 1:
      //     console.log("loaded 1");
      //     state.movies = [
      //       ...state.movies,
      //       ...moviePage1.page["content-items"].content,
      //     ];
      //     break;
      //   case 2:
      //     console.log("loaded 2");
      //     state.movies = [
      //       ...state.movies,
      //       moviePage2.page["content-items"].content,
      //     ];
      //     break;
      //   case 3:
      //     console.log("loaded 3");
      //     state.movies = [
      //       ...state.movies,
      //       moviePage3.page["content-items"].content,
      //     ];
      //   default:
      // }
    },
    getFilteredMovies: (state) => {
      state.filteredMovies = state.movies.filter((movie) =>
        movie.name.toLowerCase().includes(state.searchText.toLowerCase())
      );
    },
    changeSearchText: (state, payload) => {
      state.searchText = payload;
    },
    increasePage: (state) => {
      state.pageNum = state.pageNum + 1;
    },
  },
});

export const { loadMovies, increasePage } = moviesSlice.actions;

export default moviesSlice.reducer;
