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
    <div style={{margin: "1px",
    background: "rgb(238,174,202)",
    background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
    // Replace with your desired color
    minHeight: "100vh",
    justifyContent: "center", // Center the content horizontally
    alignItems: "center", 
    
      justifyContent: "center", // Center the content horizontally
      alignItems: "center", }}>

    <div style={{margin:"auto", width:"40%",justifyContent: "center", // Center the content horizontally
    alignItems: "center",  }}>
      <img
        alt="logo"
        src={logo}
        className="mx-auto d-block"
        style={{ width: "130px" }}
      />
      <h1 style={{margin:"auto", width:"60%",justifyContent: "center", // Center the content horizontally
    alignItems: "center",  }}>Account Details</h1>
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
        <Button variant="primary" type="submit" style={{
          
            background: "#3498db",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
            
          }}
          onMouseOver={(e) => (e.target.style.background = "#2980b9")}
          onMouseOut={(e) => (e.target.style.background = "#3498db")}>
            
          Save
        </Button>
      </Form>
    </div>
    </div>
  );
}
