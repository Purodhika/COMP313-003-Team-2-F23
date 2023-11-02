import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import './card.css';
import accountContext from "../userAccounts/accountContext";

export default function CardInfo({ setPaymentValidated }) {
  let navigate = useNavigate(); //used in handleSubmit
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  //const { loggedIn } = React.useContext(accountContext);

  //make sure that only users that are logged in can access this page
  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate("/home");
  //   }
  // }, []);

  function handleChange(event) {
    switch (event.target.name) {
      case "card-number":
        setCardNumber(event.target.value.toString());
        break;
      case "full-name":
        setName(event.target.value);
        break;
      case "address":
        setAddress(event.target.value);
        break;
      case "postal-code":
        setPostalCode(event.target.value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    setPaymentValidated(true);

    //to do: redirect to link
    //nvaigate("/order-confirmation")
  }

  return (
<div className="d-flex flex-column align-items-center">
      <h1 style={{justifyContent:'center'}}>Please enter your card details</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formCardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="number"
            name="card-number"
            value={cardNumber}
            onChange={handleChange}
            placeholder="XXXX XXXX XXXX XXXX"
            required={true}
            className="smaller-input" // Add your custom CSS class here

          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="full-name"
            value={name}
            onChange={handleChange}
            placeholder="John Doe"
            required={true}
            className="smaller-input" // Add your custom CSS class here

          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFullName">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
            placeholder="1 Abernathy Rd"
            required={true}
            className="smaller-input" // Add your custom CSS class here

          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFullName">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="postal-code"
            value={postalCode}
            onChange={handleChange}
            placeholder="A1A 1A1"
            required={true}
            className="smaller-input" // Add your custom CSS class here

          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
