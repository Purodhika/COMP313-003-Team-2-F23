import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/**
 * Component to edit an existing account
 */
export default function EditAccount() {
  let navigate = useNavigate();
  const { email } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    axios
      .get(`https://bookepedia-qta8.onrender.com/user/${email}`)
      .then((res) => {
        populateFields(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function populateFields(user) {
    setFirstName(user.fname);
    setLastName(user.lname);
    setPassword(user.password);
    setUserType(user.userType);
  }

  function handleChange(event) {
    switch (event.target.name) {
      case "first-name":
        setFirstName(event.target.value);
        break;
      case "last-name":
        setLastName(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "user-type":
        setUserType(event.target.value);
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
      email: email,
      password: password,
      userType: userType,
    };

    axios
      .patch(`https://bookepedia-qta8.onrender.com/user/${email}`, bodyData)
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Edit Account</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="first-name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="first-name"
            type="text"
            value={firstName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="last-name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="last-name"
            type="text"
            value={lastName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="text"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Account Type</Form.Label>
          <Form.Control
            as="select"
            name="user-type"
            value={userType}
            onChange={handleChange}
          >
            <option value="DELIVERY">DELIVERY</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
