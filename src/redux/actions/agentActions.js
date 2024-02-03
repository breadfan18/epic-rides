import {
  CREATE_AGENT_SUCCESS,
  DELETE_AGENT_SUCCESS,
  LOAD_AGENTS_SUCCESS,
  UPDATE_AGENT_SUCCESS,
} from "./actionTypes";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import {
  deleteFromFirebase,
  getFireBaseData,
  writeToFirebase,
} from "../../tools/firebase";
import { uid } from "uid";

function loadDataSuccess(agents) {
  return { type: LOAD_AGENTS_SUCCESS, agents };
}

function createDataSuccess(agent) {
  return { type: CREATE_AGENT_SUCCESS, agent };
}

function updateDataSuccess(agent) {
  return { type: UPDATE_AGENT_SUCCESS, agent };
}

function deleteDataSuccess(agent) {
  return { type: DELETE_AGENT_SUCCESS, agent };
}

export function loadAgentsFromFirebase(firebaseUid) {
  return (dispatch) => {
    dispatch(beginApiCall());
    getFireBaseData("agents", dispatch, loadDataSuccess, firebaseUid);
  };
}

export function saveAgentToFirebase(agent) {
  return (dispatch) => {
    /*
      BUG: dispatching beginApiCall twice here..This is a workaround for the followinsg issue:
      - Everytime new data is created or saved, redux fires LOAD and CREATE/UPDATE SUCCESS
      - This causes apiCallsInProgress to go negative. 
      - Need to understand why the LOAD action fires on Create/Update
    */
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    const agentId = agent.id === null ? `${agent.code}_${uid()}` : agent.id;

    writeToFirebase("agents", agent, agentId);
    dispatch(createDataSuccess(agent));
  };
}

export function deleteAgentFromFirebase(agent, firebaseUid) {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase("agents", agent.id, firebaseUid);
    dispatch(deleteDataSuccess(agent));
  };
}
