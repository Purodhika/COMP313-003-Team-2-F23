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

  const { setLoggedIn, setUserType, setUserEmail } = React.useContext(accountContext);

  let navigate = useNavigate();

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
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function authenticate(actualPassword) {
    return actualPassword === password;
  }

  function displayError() {
    setErrorMessage("Incorrect username or password");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <img alt="logo" src={logo} style={{ width: "200px", marginTop:"50px" }} />
      <Form style={{ maxWidth: "400px", padding: "30px", border: "2px solid #ccc", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",marginBottom: "0cm" }}>
        <h1>Login</h1>
        <p style={{ color: "#ff0000", marginBottom: "15px" }}  >{errorMessage}</p>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            name="email"
            type="email"
            placeholder="Enter email"
            autoComplete="username"
            value={email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
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
    transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
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
