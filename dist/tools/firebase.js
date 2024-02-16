"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebaseImgUrlForDataURL = exports.getStorageFileUrl = exports.storage = exports.createAccount = exports.signInEmailPwd = exports.auth = exports.logout = exports.login = exports.deleteFromFirebase = exports.writeToFirebase = exports.getFireBaseData = exports.db = exports.isTest = exports.firebaseTestConfig = exports.firebaseConfig = void 0;
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
    appId: "1:7456355664:web:a2f71ec2d7ceb53c1e6855",
};
exports.firebaseTestConfig = {
    apiKey: "AIzaSyALCARTsTD2eZbzZSJTqYjnD62oHVM3CZI",
    authDomain: "epic-rides-test.firebaseapp.com",
    databaseURL: "https://epic-rides-test-default-rtdb.firebaseio.com",
    projectId: "epic-rides-test",
    storageBucket: "epic-rides-test.appspot.com",
    messagingSenderId: "782353857514",
    appId: "1:782353857514:web:29872867433de923021093",
};
exports.isTest = process.env.REACT_APP_ENV_TEST === "test";
const app = (0, app_1.initializeApp)(exports.isTest ? exports.firebaseTestConfig : exports.firebaseConfig);
exports.db = (0, database_1.getDatabase)(app);
// DATABASE FUNCTIONS
function getFireBaseData(endpoint, dispatch, dispatchFunc) {
    (0, database_1.onValue)((0, database_1.ref)(exports.db, `/allData/${endpoint}`), (snap) => {
        const allData = [];
        snap.forEach((data) => {
            const childData = data.val();
            allData.push(childData);
        });
        dispatch(dispatchFunc(allData));
    });
}
exports.getFireBaseData = getFireBaseData;
function writeToFirebase(endpoint, data, id) {
    (0, database_1.set)((0, database_1.ref)(exports.db, `/allData/${endpoint}/${id}`), {
        ...data,
        id,
    });
}
exports.writeToFirebase = writeToFirebase;
function deleteFromFirebase(endpoint, id) {
    (0, database_1.remove)((0, database_1.ref)(exports.db, `/allData/${endpoint}/${id}`));
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
const signInEmailPwd = async (email, pwd) => {
    try {
        await (0, auth_1.signInWithEmailAndPassword)(auth, email, pwd);
        window.location = "/";
    }
    catch (err) {
        console.log("Error signing in with Firebase!");
        console.log(err.code);
        return err.code;
    }
};
exports.signInEmailPwd = signInEmailPwd;
const createAccount = async (user, handleImgCreation, imgEditor) => {
    try {
        const userCreds = await (0, auth_1.createUserWithEmailAndPassword)(auth, user.email, user.pwd);
        const scaledImgUrl = await handleImgCreation(imgEditor);
        await (0, auth_1.updateProfile)(userCreds.user, {
            displayName: `${user.firstName} ${user.lastName}`,
            photoURL: scaledImgUrl || null,
        });
        window.location = "/";
    }
    catch (err) {
        console.log(err);
        return err.code;
    }
};
exports.createAccount = createAccount;
// STORAGE FUNCTIONS
exports.storage = (0, storage_1.getStorage)(app);
const getStorageFileUrl = async (endpoint, fileName, file) => {
    const imgRef = (0, storage_1.ref)(exports.storage, `${endpoint}/${fileName}`);
    const snapshot = await (0, storage_1.uploadBytes)(imgRef, file);
    return await (0, storage_1.getDownloadURL)(snapshot.ref);
};
exports.getStorageFileUrl = getStorageFileUrl;
const getFirebaseImgUrlForDataURL = async (user, url) => {
    const imgRef = (0, storage_1.ref)(exports.storage, `images/${user.imgFile?.name}`);
    const snapshot = await (0, storage_1.uploadString)(imgRef, url, "data_url");
    const scaledImg = await (0, storage_1.getDownloadURL)(snapshot.ref);
    return scaledImg;
};
exports.getFirebaseImgUrlForDataURL = getFirebaseImgUrlForDataURL;
