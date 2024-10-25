// src/app/store.js

import { createStore } from 'redux';
import moviesReducer from '../features/moviesSlice';

const store = createStore(moviesReducer);

export default store;
