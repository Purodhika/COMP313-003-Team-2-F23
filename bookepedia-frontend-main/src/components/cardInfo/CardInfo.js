import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import accountContext from "../userAccounts/accountContext";

export default function CardInfo({ setPaymentValidated }) {
  let navigate = useNavigate(); //used in handleSubmit
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isCardNumberValid, setIsCardNumberValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isPostalCodeValid, setIsPostalCodeValid] = useState(true);

  //const { loggedIn } = React.useContext(accountContext);

  //make sure that only users that are logged in can access this page
  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate("/home");
  //   }
  // }, []);
  function validateCardNumber(number) {
    const re = /^[0-9]{16}$/;
    return re.test(number);
  }

  function validateName(name) {
    const re = /^[A-Za-z ]+$/;
    return re.test(name);
  }
  
  function validateAddress(address) {
    const re = /^[A-Za-z0-9\s,.'-]{3,}$/;
    return re.test(address);
  }
  
  function validatePostalCode(postalCode) {
    const re = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    return re.test(postalCode);
  }

  function handleChange(event) {
    switch (event.target.name) {
      case "card-number":
        setCardNumber(event.target.value.toString());
        setIsCardNumberValid(validateCardNumber(event.target.value.toString()));
        break;
      case "full-name":
        setName(event.target.value);
        setIsNameValid(validateName(event.target.value));
        break;
      case "address":
        setAddress(event.target.value);
        setIsAddressValid(validateAddress(event.target.value));
        break;
      case "postal-code":
        setPostalCode(event.target.value);
        setIsPostalCodeValid(validatePostalCode(event.target.value));
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
    <div>
      <h1>Please enter your card details</h1>
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
          />
           {!isCardNumberValid && (
            <Form.Label style={{ color: 'red' }}>
              Please enter a valid 16-digit card number
            </Form.Label>
          )}
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
          />
          {!isNameValid && (
            <Form.Label style={{ color: 'red' }}>
              Please enter a valid full name
            </Form.Label>
          )}
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
          />
            {!isAddressValid && (
            <Form.Label style={{ color: 'red' }}>
              Please enter a valid address
            </Form.Label>
          )}
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
          /> 
          {!isPostalCodeValid && (
            <Form.Label style={{ color: 'red' }}>
              Please enter a valid postal code
            </Form.Label>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
