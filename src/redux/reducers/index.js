import { combineReducers } from "redux";
import data, { activeTourReducer as activeTour } from "./dataReducer";
// import activeTour from "./activeTourReducer";
import agents from "./agentsReducer";
import apiCallsInProgress from "./apiStatusReducer";
import activeTab from "./activeTabReducer";
import { USER_LOGOUT_SUCCESS } from "../actions/actionTypes";

const appReducer = combineReducers({
  data,
  agents,
  apiCallsInProgress,
  activeTab,
  activeTour,
});

const rootReducer = (state, action) => {
  // The following is done in order to reset the state on logout.
  if (action.type === USER_LOGOUT_SUCCESS) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
