export const FETCHING_MOVIES = "FETCHING_MOVIES";
export const MOVIES_FETCHED = "MOVIES_FETCHED";
export const FETCH_MOVIES_ERROR = "FETCH_MOVIES_ERROR";

export const fetchMovies = () => {
  const moviesNames = [
    "Fight Club",
    "Pulp Fiction",
    "Inception",
    "Matrix",
    "The Hobbit",
    "X-MEN",
    "The Wolf of Wall Street",
    "Suicide Squad",
    "The Godfather",
    "Taken",
    "Taken 2",
    "Taken 3"
  ];

  return dispatch => {
    dispatch({ type: FETCHING_MOVIES });

    return Promise.all(
      moviesNames.map(name =>
        fetch(`http://www.omdbapi.com/?t=${name}&apikey=977116c7`)
          .then(response => response.json())
          .catch(err =>
            dispatch({
              type: FETCH_MOVIES_ERROR,
              payload: err.message
            })
          )
      )
    ).then(results =>
      dispatch({
        type: MOVIES_FETCHED,
        payload: results
      })
    )
  };
};
