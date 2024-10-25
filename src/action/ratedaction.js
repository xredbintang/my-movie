

export const RATE_FILM = 'ratings/rateFilm';
export const RESET_RATINGS = 'ratings/resetRatings';


export const rateFilm = (filmId, rating) => {
  console.log("rated film action created", {filmId,rating})
  return {
    type: RATE_FILM,
    payload: { filmId, rating },
  };
};

export const resetRatings = () => {
  return {
    type: RESET_RATINGS,
  };
};
