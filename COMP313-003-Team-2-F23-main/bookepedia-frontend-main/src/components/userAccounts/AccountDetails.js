import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import accountContext from "./accountContext";
import { useNavigate } from "react-router-dom";

import logo from "../media/bookepedia.gif";

export default function AccountDetails() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { userEmail } = React.useContext(accountContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (userEmail !== "") {
      axios
        .get(`https://bookepedia-qta8.onrender.com/user/${userEmail}`)
        .then((res) => {
          setFirstName(res.data.fname);
          setLastName(res.data.lname);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      navigate("/login");
    }
  }, []);

  function handleChange(event) {
    switch (event.target.name) {
      case "first-name":
        setFirstName(event.target.value);
        break;
      case "last-name":
        setLastName(event.target.value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    var bodyData = {
      fname: firstName,
      lname: lastName,
    };

    axios
      .patch(`https://bookepedia-qta8.onrender.com/user/${userEmail}`, bodyData)
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "1px",
        background:
          "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        minHeight: "100vh",
      }}
    >
      <img alt="logo" src={logo} className="mx-auto d-block" style={{ width: "130px" }} />
      <h1>Account Details</h1>
      <Form
        style={{
          maxWidth: "400px", // Adjust the width as needed
          width: "100%",
          textAlign: "center", // Center the content horizontally
        }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="first-name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            name="first-name"
            onChange={handleChange}
            style={{ borderRadius: "10px" }} // Adjust the border radius as needed
          />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="last-name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            name="last-name"
            onChange={handleChange}
            style={{ borderRadius: "10px" }} // Adjust the border radius as needed
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{
            background: "linear-gradient(to right, #3498db, #5bafde)",
            color: "#fff",
            padding: "10px 20px",
            margin: "20px 10px", // Adjusted margin
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Save
        </Button>
      </Form>
    </div>
  );
  
  
}
