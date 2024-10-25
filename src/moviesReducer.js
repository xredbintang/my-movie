// src/features/moviesSlice.js

const initialState = {
    movies: [],
    loading: false,
    error: null,
  };
  
  // Action Types
  const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
  const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
  const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
  
  // Reducer
  const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_MOVIES_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_MOVIES_SUCCESS:
        return { ...state, loading: false, movies: action.payload };
      case FETCH_MOVIES_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Action Creators
  export const fetchMoviesRequest = () => ({ type: FETCH_MOVIES_REQUEST });
  export const fetchMoviesSuccess = (movies) => ({
    type: FETCH_MOVIES_SUCCESS,
    payload: movies,
  });
  export const fetchMoviesFailure = (error) => ({
    type: FETCH_MOVIES_FAILURE,
    payload: error,
  });
  
  export default moviesReducer;
  