import {
  CREATE_DATA_SUCCESS,
  CREATE_CARD_NOTES_SUCCESS,
  DELETE_CARD_NOTES_SUCCESS,
  DELETE_DATA_SUCCESS,
  LOAD_DATA_SUCCESS,
  UPDATE_DATA_SUCCESS,
} from "./actionTypes";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import {
  deleteFromFirebase,
  getFireBaseData,
  writeToFirebase,
} from "../../tools/firebase";
import { uid } from "uid";

function loadDataSuccess(data) {
  return { type: LOAD_DATA_SUCCESS, data };
}

function createDataSuccess(data) {
  return { type: CREATE_DATA_SUCCESS, data };
}

function updateDataSuccess(data) {
  return { type: UPDATE_DATA_SUCCESS, data };
}

function deleteDataSuccess(data) {
  return { type: DELETE_DATA_SUCCESS, data };
}

function createDataNotesSuccess(cardNote) {
  return { type: CREATE_CARD_NOTES_SUCCESS, cardNote };
}

function deleteDataNotesSuccess(cardNote) {
  return { type: DELETE_CARD_NOTES_SUCCESS, cardNote };
}

export function loadDataFromFirebase(firebaseUid) {
  return (dispatch) => {
    dispatch(beginApiCall());
    getFireBaseData("data", dispatch, loadDataSuccess, firebaseUid);
  };
}

export function saveDataToFirebase(data, id) {
  return (dispatch) => {
    /*
      BUG: dispatching beginApiCall twice here..This is a workaround for the followinsg issue:
      - Everytime new data is created or saved, redux fires LOAD and CREATE/UPDATE SUCCESS
      - This causes apiCallsInProgress to go negative. 
      - Need to understand why the LOAD action fires on Create/Update
    */
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    // const dataId = data.id === null ? uid() : data.id;

    writeToFirebase("data", data, id);
    dispatch(createDataSuccess(data));
  };
}

export function deleteDataFromFirebase(data, firebaseUid) {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase("data", data.id, firebaseUid);
    dispatch(deleteDataSuccess(data));
  };
}

export function saveTourNoteToFirebase(note, tourId, firebaseUid) {
  return (dispatch) => {
    /*
      BUG: dispatching beginApiCall twice here..This is a workaround for the followinsg issue:
      - Everytime new data is created or saved, redux fires LOAD and CREATE/UPDATE SUCCESS
      - This causes apiCallsInProgress to go negative. 
      - Need to understand why the LOAD action fires on Create/Update
    */
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    const uuid = note.id === null || note.id === undefined ? uid() : note.id;
    writeToFirebase(`data/${tourId}/tourNotes`, note, uuid, firebaseUid);
    dispatch(createDataNotesSuccess(note));
  };
}

export function deleteTourNoteFromFirebase(note, tourId, firebaseUid) {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase(`data/${tourId}/tourNotes`, note.id, firebaseUid);
    dispatch(deleteDataNotesSuccess(note));
  };
}
