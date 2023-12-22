import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import {
  getStorage,
  getDownloadURL,
  uploadBytes,
  ref as storageRef,
  uploadString,
} from "firebase/storage";
import { USER_STOCK_IMG } from "../constants/constants";

export const firebaseConfig = {
  apiKey: "AIzaSyCeGlbd_IUxNhGQaWChisz6naRXE5sMXnA",
  authDomain: "epic-rides-aa67e.firebaseapp.com",
  databaseURL: "https://epic-rides-aa67e-default-rtdb.firebaseio.com",
  projectId: "epic-rides-aa67e",
  storageBucket: "epic-rides-aa67e.appspot.com",
  messagingSenderId: "7456355664",
  appId: "1:7456355664:web:a2f71ec2d7ceb53c1e6855",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// DATABASE FUNCTIONS
export function getFireBaseData(endpoint, dispatch, dispatchFunc) {
  onValue(ref(db, `/allData/${endpoint}`), (snap) => {
    const allData = [];
    snap.forEach((data) => {
      const childData = data.val();
      allData.push(childData);
    });
    dispatch(dispatchFunc(allData));
  });
}

export function writeToFirebase(endpoint, data, id) {
  set(ref(db, `/allData/${endpoint}/${id}`), {
    ...data,
    id,
  });
}

export function deleteFromFirebase(endpoint, id) {
  remove(ref(db, `/allData/${endpoint}/${id}`));
}

// AUTH FUNCTIONS
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const auth = getAuth(app);

const login = async (auth) => {
  await signInWithPopup(auth, provider);
};

const logout = (auth) => auth.signOut();

const signInEmailPwd = async (email, pwd) => {
  try {
    await signInWithEmailAndPassword(auth, email, pwd);
    window.location = "/";
  } catch (err) {
    console.log("Error signing in with Firebase!");
    console.log(err.code);
    return err.code;
  }
};

const createAccount = async (user, handleImgCreation, imgEditor) => {
  try {
    const userCreds = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.pwd
    );

    const scaledImgUrl = await handleImgCreation(imgEditor);
    await updateProfile(userCreds.user, {
      displayName: `${user.firstName} ${user.lastName}`,
      photoURL: scaledImgUrl || null,
    });

    window.location = "/";
  } catch (err) {
    console.log(err);
    return err.code;
  }
};

export { login, logout, auth, signInEmailPwd, createAccount };

// STORAGE FUNCTIONS
export const storage = getStorage(app);

export const getFirebaseImgUrl = async (cardholder) => {
  const imgRef = storageRef(storage, `images/${cardholder.imgFile?.name}`);
  const snapshot = await uploadBytes(imgRef, cardholder.imgFile);
  return await getDownloadURL(snapshot.ref);
};

export const getFirebaseImgUrlForDataURL = async (user, url) => {
  const imgRef = storageRef(storage, `images/${user.imgFile?.name}`);
  const snapshot = await uploadString(imgRef, url, "data_url");
  const scaledImg = await getDownloadURL(snapshot.ref);
  return scaledImg;
};
