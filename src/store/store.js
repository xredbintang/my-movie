// store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../reducer/themereducer";
import { moviesReducer } from "../reducer/moviereducer";
import ratedReducer from "../reducer/ratedreducer";


const store = configureStore({
  reducer: {
    theme : themeReducer,
    movies : moviesReducer,
    ratings : ratedReducer,
  }
});

export default store;
