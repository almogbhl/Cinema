import {
  FETCHING_MOVIES,
  MOVIES_FETCHED,
  FETCH_MOVIES_ERROR
} from "./Browse/Browse.action";

import {
  FETCH_MOVIE_BEGIN,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE
} from "./Browse/Create/Create.action";

import { DELETE_ITEM } from "./Browse/Card/Card.action";

let initialState = {
  movies_list: null,
  isLoading: false,
  errMsg: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ITEM:
    const updatedList = state.movies_list.filter((item, i) => i !== action.payload);
      return {
        ...state,
        movies_list: updatedList
      };
    case FETCHING_MOVIES:
      return {
        ...state,
        isLoading: true
      };
    case MOVIES_FETCHED:
      return {
        ...state,
        movies_list: action.payload,
        isLoading: false
      };
    case FETCH_MOVIES_ERROR:
      return {
        ...state,
        errMsg: action.payload
      };
    case FETCH_MOVIE_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        movies_list: [ action.payload, ...state.movies_list],
        isLoading: false
      };
    case FETCH_MOVIE_FAILURE:
      return {
        ...state,
        movies_list: [...state.movies_list],
        errMsg: action.payload
      };
    default:
      return state;
  }
};
