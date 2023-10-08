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
        .get(`http://localhost:3500/user/${userEmail}`)
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
      .patch(`http://localhost:3500/user/${userEmail}`, bodyData)
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div style={{margin:"auto", width:"40%"}}>
      <img
        alt="logo"
        src={logo}
        className="mx-auto d-block"
        style={{ width: "130px" }}
      />
      <h1>Account Details</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="first-name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            name="first-name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="last-name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            name="last-name"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}
