"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebaseImgUrlForDataURL = exports.getFirebaseImgUrl = exports.storage = exports.auth = exports.logout = exports.login = exports.deleteFromFirebase = exports.writeToFirebase = exports.getFireBaseData = exports.db = exports.firebaseConfig = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const database_1 = require("firebase/database");
const storage_1 = require("firebase/storage");
exports.firebaseConfig = {
    apiKey: "AIzaSyCeGlbd_IUxNhGQaWChisz6naRXE5sMXnA",
    authDomain: "epic-rides-aa67e.firebaseapp.com",
    databaseURL: "https://epic-rides-aa67e-default-rtdb.firebaseio.com",
    projectId: "epic-rides-aa67e",
    storageBucket: "epic-rides-aa67e.appspot.com",
    messagingSenderId: "7456355664",
    appId: "1:7456355664:web:a2f71ec2d7ceb53c1e6855"
};
const app = (0, app_1.initializeApp)(exports.firebaseConfig);
exports.db = (0, database_1.getDatabase)(app);
// DATABASE FUNCTIONS
function getFireBaseData(endpoint, dispatch, dispatchFunc, firebaseUid) {
    (0, database_1.onValue)((0, database_1.ref)(exports.db, `/users/${firebaseUid}/${endpoint}`), (snap) => {
        const allData = [];
        snap.forEach((data) => {
            const childData = data.val();
            allData.push(childData);
        });
        dispatch(dispatchFunc(allData));
    });
}
exports.getFireBaseData = getFireBaseData;
function writeToFirebase(endpoint, data, id, firebaseUid) {
    (0, database_1.set)((0, database_1.ref)(exports.db, `/users/${firebaseUid}/${endpoint}/${id}`), {
        ...data,
        id,
    });
}
exports.writeToFirebase = writeToFirebase;
function deleteFromFirebase(endpoint, id, firebaseUid) {
    (0, database_1.remove)((0, database_1.ref)(exports.db, `/users/${firebaseUid}/${endpoint}/${id}`));
}
exports.deleteFromFirebase = deleteFromFirebase;
// AUTH FUNCTIONS
const provider = new auth_1.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
const login = async (auth) => {
    await (0, auth_1.signInWithPopup)(auth, provider);
};
exports.login = login;
const logout = (auth) => auth.signOut();
exports.logout = logout;
// STORAGE FUNCTIONS
exports.storage = (0, storage_1.getStorage)(app);
const getFirebaseImgUrl = async (cardholder) => {
    const imgRef = (0, storage_1.ref)(exports.storage, `images/${cardholder.imgFile?.name}`);
    const snapshot = await (0, storage_1.uploadBytes)(imgRef, cardholder.imgFile);
    return await (0, storage_1.getDownloadURL)(snapshot.ref);
};
exports.getFirebaseImgUrl = getFirebaseImgUrl;
const getFirebaseImgUrlForDataURL = async (cardholder, url) => {
    const imgRef = (0, storage_1.ref)(exports.storage, `images/${cardholder.imgFile?.name}`);
    const snapshot = await (0, storage_1.uploadString)(imgRef, url, "data_url");
    const scaledImg = await (0, storage_1.getDownloadURL)(snapshot.ref);
    return scaledImg;
};
exports.getFirebaseImgUrlForDataURL = getFirebaseImgUrlForDataURL;
