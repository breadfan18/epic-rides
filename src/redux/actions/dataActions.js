import {
  CREATE_DATA_SUCCESS,
  CREATE_CARD_NOTES_SUCCESS,
  DELETE_CARD_NOTES_SUCCESS,
  DELETE_DATA_SUCCESS,
  LOAD_DATA_SUCCESS,
  UPDATE_DATA_SUCCESS,
} from "./actionTypes";
import * as cardsApi from "../../api/cardsApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import {
  deleteFromFirebase,
  getFireBaseData,
  writeToFirebase,
} from "../../tools/firebase";
import { slugify } from "../../helpers";
import { uid } from "uid";

function loadDataSuccess(cards) {
  return { type: LOAD_DATA_SUCCESS, cards };
}

function createDataSuccess(card) {
  return { type: CREATE_DATA_SUCCESS, card };
}

function updateDataSuccess(card) {
  return { type: UPDATE_DATA_SUCCESS, card };
}

function deleteDataSuccess(card) {
  return { type: DELETE_DATA_SUCCESS, card };
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

export function saveDataToFirebase(card, firebaseUid) {
  return (dispatch) => {
    /*
      BUG: dispatching beginApiCall twice here..This is a workaround for the followinsg issue:
      - Everytime new data is created or saved, redux fires LOAD and CREATE/UPDATE SUCCESS
      - This causes apiCallsInProgress to go negative. 
      - Need to understand why the LOAD action fires on Create/Update
    */
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    const cardId =
      card.id === null
        ? slugify(
            card.issuer.name + " " + card.card + " " + card.userId + " " + uid()
          )
        : card.id;

    writeToFirebase("cards", card, cardId, firebaseUid);
    dispatch(createDataSuccess(card));
  };
}

export function deleteDataFromFirebase(card, firebaseUid) {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase("cards", card.id, firebaseUid);
    dispatch(deleteDataSuccess(card));
  };
}

export function saveDataNoteToFirebase(note, cardId, firebaseUid) {
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
    writeToFirebase(`cards/${cardId}/cardNotes`, note, uuid, firebaseUid);
    dispatch(createDataNotesSuccess(note));
  };
}

export function deleteDataNoteFromFirebase(note, cardId, firebaseUid) {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase(`cards/${cardId}/cardNotes`, note.id, firebaseUid);
    dispatch(deleteDataNotesSuccess(note));
  };
}

