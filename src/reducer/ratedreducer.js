import { RATE_FILM, RESET_RATINGS } from '../action/ratedaction';

const initialState = {
  ratedFilms: [], 
};


const ratedReducer = (state = initialState, action) => {
  console.log("action received", action)
  console.log("action received", state)
  switch (action.type) {
    case RATE_FILM: {
      const { filmId, rating } = action.payload;
      console.log({filmId, rating})
      const existingFilm = state.ratedFilms.find(film => film.id === filmId);


      if (existingFilm) {
        console.log(filmId)
        return {
          ...state,
          ratedFilms: state.ratedFilms.map(film =>
            film.id === filmId ? { ...film, userRating: rating } : film
          ),
        };
      } 

      else {
        return {
          ...state,
          ratedFilms: [...state.ratedFilms, { id: filmId, userRating: rating }],
        };
      }
    }
    case RESET_RATINGS: {
      return {
        ...state,
        ratedFilms: [],
      };
    }
    default:
      return state;
  }
};

export default ratedReducer;
