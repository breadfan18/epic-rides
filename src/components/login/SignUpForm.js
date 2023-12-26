import { Button } from "react-bootstrap";
import React, { useState } from "react";
import {
  createAccount,
  getFirebaseImgUrlForDataURL,
} from "../../tools/firebase";
import UserInput from "./UserInput";
import PasswordInput from "./PasswordInput";
// import { FaUserCircle } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdAlternateEmail, MdOutlinePassword } from "react-icons/md";
import {
  APP_COLOR_LIGHT_GRAY,
  ERN_PASSCODE,
  NEW_USER,
  USER_STOCK_IMG,
} from "../../constants/constants";
import { isPasswordValid, setLoginErrorText, titleCase } from "../../helpers";
import Error from "../common/Error";
import PhotoEditor from "./PhotoEditor";
import PhotoEditButton from "./PhotoEditButton";

export default function SignUpForm() {
  const [user, setUser] = useState(NEW_USER);
  const [error, setError] = useState(null);
  const [imgEditor, setImgEditor] = useState(null);
  const [ernPasscodeValue, setErnPasscode] = useState("");
  const [ernPasscodeMatched, setErnPasscodeMatched] = useState(false);

  function handleChange(e) {
    const { name, value, files } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: name === "imgFile" ? files[0] : value,
    }));
  }

  const handleErnPasscodeChange = (e) => setErnPasscode(e.target.value);

  const handleErnPasscodeSubmit = (e) => {
    e.preventDefault();
    if (ernPasscodeValue === "" || ernPasscodeValue === null) return;
    if (ernPasscodeValue === ERN_PASSCODE) {
      setErnPasscodeMatched(true);
      setError("");
    } else setError("ERN Passcode not valid");
  };

  const handleErnPasscodeSubmitOnEnter = async (e) => {
    if (e.keyCode === 13) {
      // e.preventDefault();
      if (ernPasscodeValue === "" || ernPasscodeValue === null) return;
      if (ernPasscodeValue === ERN_PASSCODE) {
        setErnPasscodeMatched(true);
        setError("");
      } else setError("ERN Passcode not valid");
    }
  };

  const handleSavePhoto = async (editor) => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const profilePhotoURL = canvas.toDataURL();
      return await getFirebaseImgUrlForDataURL(user, profilePhotoURL);
    }
  };

  const handleSignup = async () => {
    if (user.firstName === "") {
      setError("First Name Required");
    } else if (user.lastName === "") {
      setError("Last Name Required");
    } else if (user.email === "") {
      setError("Email address Required");
    } else if (!isPasswordValid(user.pwd)) {
      setError(
        "Passwords must be at least 8 characters, include at least one CAPITAL letter and 1 Number"
      );
    } else if (user.pwd !== user.confirmPwd) {
      setError("Password don't match");
    } else {
      const signUpError = await createAccount(user, handleSavePhoto, imgEditor);
      if (signUpError) {
        setError(setLoginErrorText(await signUpError));
      }
    }
  };

  return (
    <>
      {error && <Error errorMessage={error} />}
      {ernPasscodeMatched ? (
        <form action="" className="userAndPwdForm">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "white",
              padding: "5px",
              borderRadius: "10px",
              border: "1px solid " + APP_COLOR_LIGHT_GRAY,
              marginBottom: "10px",
            }}
          >
            {user.imgFile ? (
              <PhotoEditor
                image={user.imgFile}
                handleSave={handleSavePhoto}
                setEditor={setImgEditor}
              />
            ) : (
              <img
                src={USER_STOCK_IMG}
                alt="user"
                style={{ height: "7rem", width: "7rem" }}
              />
            )}
            {!user.imgFile && <PhotoEditButton onChange={handleChange} />}
          </div>
          <UserInput
            Icon={FaUserCircle}
            onChange={handleChange}
            name="firstName"
            placeholder="First Name"
            value={titleCase(user.firstName)}
          />
          <UserInput
            Icon={FaUserCircle}
            onChange={handleChange}
            name="lastName"
            placeholder="Last Name"
            value={titleCase(user.lastName)}
          />
          <UserInput
            Icon={MdAlternateEmail}
            onChange={handleChange}
            name="email"
            placeholder="Email address"
            value={user.email}
            isEmail
          />
          <PasswordInput
            name="pwd"
            onChange={handleChange}
            pwd={user.pwd}
            placeholder="Password"
          />
          <PasswordInput
            name="confirmPwd"
            onChange={handleChange}
            pwd={user.confirmPwd}
            placeholder="Confirm Password"
          />
          <Button
            className="loginSubmit"
            style={{ backgroundColor: "black", border: "5px solid black" }}
            onClick={() => handleSignup()}
          >
            Sign Up
          </Button>
        </form>
      ) : (
        <div className="userAndPwdForm">
          <p>
            To create an account, enter the passcode provided by Epic Rides
            Nepal Site Administrator
          </p>
          <UserInput
            Icon={MdOutlinePassword}
            onChange={handleErnPasscodeChange}
            name="ernPasscode"
            placeholder="ERN Passcode"
            value={ernPasscodeValue}
            isErnPasscode
            onKeyDown={handleErnPasscodeSubmitOnEnter}
          />
          <Button
            className="loginSubmit"
            style={{ backgroundColor: "black", border: "5px solid black" }}
            onClick={(e) => handleErnPasscodeSubmit(e)}
          >
            Submit
          </Button>
        </div>
      )}
    </>
  );
}
