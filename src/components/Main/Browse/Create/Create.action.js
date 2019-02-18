export const FETCH_MOVIE_BEGIN = "FETCH_MOVIE_BEGIN";
export const FETCH_MOVIE_SUCCESS = "FETCH_MOVIE_SUCCESS";
export const FETCH_MOVIE_FAILURE = "FETCH_MOVIE_FAILURE";


export const create_movie = (movie_name) => {
  return dispatch => {
    dispatch({ type: FETCH_MOVIE_BEGIN });
    fetch(`http://www.omdbapi.com/?t=${movie_name}&apikey=977116c7`)
      .then(res => res.json())
      .then(res => {
        if(res.Response === "False") {
          dispatch({
            type: FETCH_MOVIE_FAILURE,
            payload: res.Error
          })
        } else {
          dispatch({
            type: FETCH_MOVIE_SUCCESS,
            payload: res
          })
        }
      }
      )
      .catch(err =>
        dispatch({
          type: FETCH_MOVIE_FAILURE,
          payload: err
        })
      );
  };
};

