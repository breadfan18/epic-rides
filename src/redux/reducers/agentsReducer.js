import {
  CREATE_AGENT_SUCCESS,
  DELETE_AGENT_SUCCESS,
  LOAD_AGENTS_SUCCESS,
  UPDATE_AGENT_SUCCESS,
} from "../actions/actionTypes";
import initialState from "./initialState";

export default function cardsReducer(state = initialState.agents, action) {
  switch (action.type) {
    case LOAD_AGENTS_SUCCESS:
      return action.agents;
    case CREATE_AGENT_SUCCESS:
      /* This is just returning state instead of [...state, { ...action.card }]
      because Firebase real time database adds new data immediately..
      so it's already available in state */
      return state;
    case UPDATE_AGENT_SUCCESS:
      return state.map((agent) =>
        agent.id === action.agent.id ? action.agent : agent
      );
    case DELETE_AGENT_SUCCESS:
      return state.filter((agent) => agent.id !== action.agent.id);
    default:
      return state;
  }
}
