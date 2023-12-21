import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { auth, createAccount } from "../../tools/firebase";
import UserInput from "./UserInput";
import PasswordInput from "./PasswordInput";
// import { FaUserCircle } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { NEW_USER } from "../../constants/constants";
import { titleCase } from "../../helpers";

export default function SignUpForm() {
  const [user, setUser] = useState(NEW_USER);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form action="" className="userAndPwdForm">
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
        onClick={() => createAccount(auth, user)}
      >
        Sign Up
      </Button>
    </form>
  );
}
