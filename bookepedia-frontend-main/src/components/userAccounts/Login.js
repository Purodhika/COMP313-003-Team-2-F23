import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import accountContext from "./accountContext";

//css
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import logo from "../media/bookepedia.gif";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setLoggedIn, setUserType, setUserEmail } =
    React.useContext(accountContext);

  let navigate = useNavigate();

  //connect with database
  //find by id via emailfield
  //check password with corresponding value
  //if successful, update accountContext

  function handleLogIn(event) {
    event.preventDefault();
    setErrorMessage("");
    axios
      .get(`http://localhost:3500/user/${email}`)
      .then((res) => {
        if (authenticate(res.data.password)) {
          setLoggedIn(true);
          setUserType(res.data.userType);
          setUserEmail(res.data.email);
          navigate("/home");
        } else {
          displayError();
        }
      })
      .catch(() => {
        displayError();
      });
  }

  function handleChange(event) {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  }

  function authenticate(actualPassword) {
    if (actualPassword === password) {
      return true;
    } else {
      return false;
    }
  }

  function displayError() {
    setErrorMessage("Incorrect username or password");
  }

  return (
    //create UI for login form
    <div style={{margin:"auto", width:"40%"}} className="loginForm">
      <img
        alt="logo"
        src={logo}
        className="mx-auto d-block"
        style={{ width: "130px" }}
      />
      <Form style={{ maxWidth: "450px", padding: "30px" }} className="mx-auto d-block border border-2">
        <h1>Login</h1>
        <p color="#ff0000">{errorMessage}</p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required={true}
            name="email"
            type="email"
            placeholder="Enter email"
            autoComplete="username"
            value={email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required={true}
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleLogIn}>
          Login
        </Button>
      </Form>
    </div>
  );
}
