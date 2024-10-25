import {
    MOVIE_REQUEST,
    MOVIE_SUKSES,
    MOVIE_GAGAL,
} from '../action/movieaction';

const initialState = {
    movies: [],
    randomMovie: null,
    loading: false,
    error: null,
};

export const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case MOVIE_SUKSES:
            const randomIndex = Math.floor(Math.random() * action.payload.length);
            return {
                ...state,
                loading: false,
                movies: action.payload,
                randomMovie: action.payload[randomIndex],
            };

        case MOVIE_GAGAL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return state;
    }
};
