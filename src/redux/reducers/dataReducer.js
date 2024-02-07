import {
  CREATE_DATA_SUCCESS,
  DELETE_DATA_SUCCESS,
  LOAD_DATA_SUCCESS,
  SET_ACTIVE_TOUR_SUCCESS,
  UPDATE_DATA_SUCCESS,
} from "../actions/actionTypes";
import initialState from "./initialState";

export default function cardsReducer(state = initialState.data, action) {
  switch (action.type) {
    case LOAD_DATA_SUCCESS:
      return action.data;
    case CREATE_DATA_SUCCESS:
      /* This is just returning state instead of [...state, { ...action.card }]
      because Firebase real time database adds new data immediately..
      so it's already available in state */
      return state;
    // case UPDATE_DATA_SUCCESS:
    //   return state.map((card) =>
    //     card.id === action.card.id ? action.card : card
    //   );
    case DELETE_DATA_SUCCESS:
      return state.filter((card) => card.id !== action.data.id);
    default:
      return state;
  }
}

export function activeTourReducer(state = initialState.activeTour, action) {
  switch (action.type) {
    case SET_ACTIVE_TOUR_SUCCESS:
      return action.activeTour;
    default:
      return state;
  }
}
