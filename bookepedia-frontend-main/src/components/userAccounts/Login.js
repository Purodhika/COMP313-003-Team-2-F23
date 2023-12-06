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
      .get(`https://bookepedia-qta8.onrender.com/user/${email}`)
      .then((res) => {
        if (authenticate(res.data.password)) {
          setLoggedIn(true);
          setUserType(res.data.userType);
          setUserEmail(res.data.email);
          accountContext.email= res.data.email
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
    
    <div
      style={{
        margin: "auto",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",  // Add padding to the section
        background: "rgb(238,174,202)",
        background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      }}
      className="loginForm"
    >
      <img
        alt="logo"
        src={logo}
        className="mx-auto d-block"
        style={{ width: "130px", margin:"20px" }}
      />
      <Form
        style={{
          maxWidth: "400px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "30px",
          background: "rgb(238,174,202)",
          background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        }}
        className="mx-auto d-block border border-2"
      >
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <p style={{ color: "#ff0000", marginBottom: "15px" }} color="#ff0000">{errorMessage}</p>
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
        <Button
          variant="primary"
          onClick={handleLogIn}
          style={{
            background: "linear-gradient(to right, #3498db, #5bafde)", // Gradient background
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            marginTop: "15px",
            transition: "background 0.3s, transform 0.3s, box-shadow 0.3s"
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Login
        </Button>
      </Form>
    </div>
  );  
}
