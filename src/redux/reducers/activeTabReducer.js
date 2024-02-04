import { SET_ACTIVE_TAB_SUCCESS } from "../actions/actionTypes";
import initialState from "./initialState";

export default function activeTabReducer(
  state = initialState.activeTab,
  action
) {
  switch (action.type) {
    case SET_ACTIVE_TAB_SUCCESS:
      return action.activeTab;
    default:
      return state;
  }
}
