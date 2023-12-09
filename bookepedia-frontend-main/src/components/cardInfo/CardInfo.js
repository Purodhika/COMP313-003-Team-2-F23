import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import accountContext from "../userAccounts/accountContext";
import "./CardInfo.css"; // Import your custom CSS file

export default function CardInfo({ setPaymentValidated }) {
  let navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [formErrors, setFormErrors] = useState({
    cardNumber: "",
    name: "",
    address: "",
    postalCode: "",
  });

  // Validation regular expressions
  const cardNumberRegex = /^[0-9]{16}$/;
  const nameRegex = /^[a-zA-Z\s]+$/;
  const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  

  function handleChange(event) {
    const { name, value } = event.target;
    let errors = { ...formErrors };

    switch (name) {
      case "card-number":
        errors.cardNumber = cardNumberRegex.test(value)
          ? ""
          : "Invalid card number, Maximum 16 characters";
        setCardNumber(value);
        break;
      case "full-name":
        errors.name = nameRegex.test(value) ? "" : "Invalid name";
        setName(value);
        break;
      case "address":
        errors.address = addressRegex.test(value) ? "" : "Invalid address";
        setAddress(value);
        break;
      case "postal-code":
        errors.postalCode = postalCodeRegex.test(value)
          ? ""
          : "Invalid postal code";
        setPostalCode(value);
        break;
      default:
        break;
    }

    setFormErrors(errors);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Check if there are no errors before setting as validated
    if (
      !formErrors.cardNumber &&
      !formErrors.name &&
      !formErrors.address &&
      !formErrors.postalCode
    ) {
      setPaymentValidated(true);
      // TODO: Redirect to the order confirmation page
      // navigate("/order-confirmation");
    } else {
      // Handle form errors
      console.log("Form has errors. Please correct them before submitting.");
    }
  }

  return (
    <div className="payment-form-container">
      <h1>Please enter your card details</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formCardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            name="card-number"
            value={cardNumber}
            onChange={handleChange}
            placeholder="XXXX XXXX XXXX XXXX"
            required
          />
          {formErrors.cardNumber && (
            <div className="error-message">{formErrors.cardNumber}</div>
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
            required
          />
          {formErrors.name && (
            <div className="error-message">{formErrors.name}</div>
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
            required
          />
          {formErrors.address && (
            <div className="error-message">{formErrors.address}</div>
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
            required
          />
          {formErrors.postalCode && (
            <div className="error-message">{formErrors.postalCode}</div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
