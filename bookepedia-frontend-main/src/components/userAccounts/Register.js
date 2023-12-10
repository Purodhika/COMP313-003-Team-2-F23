import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import logo from "../media/bookepedia.gif";

import { useNavigate } from "react-router-dom";

function Register(props) {
  const [userRec, setUserRec] = React.useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [firstNameError, setFirstNameError] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [retypePasswordError, setRetypePasswordError] = React.useState('');

  let navigate = useNavigate();

  const onchange = (e) => {
    const { name, value } = e.target;
    setUserRec({ ...userRec, [e.target.name]: e.target.value });
    switch (name) {
      case 'fname':
        validateFirstName(value);
        break;
      case 'lname':
        validateLastName(value);
        break;
      case 'email':
        validateEmail(value);
        break;
      case 'password':
        validatePassword(value);
        break;
      case 'pwordRetype':
        validateRetypePassword(document.getElementById("pwordRetype").value, userRec.password);
        break;
    }
  };

  const validateFirstName = (name) => {
    const nameRegex = /^[A-Za-z\s'-]+$/;
    if (!name.trim()) {
      setFirstNameError('First name is required');
      return false;
    } else if (!nameRegex.test(name)) {
      setFirstNameError('First name contains invalid characters');
      return false;
    } else {
      setFirstNameError('');
      return true;
    }
  };
  

  function validateLastName(name) {
    const nameRegex = /^[A-Za-z\s'-]+$/;
    if (!name.trim()) {
      setLastNameError('Last name is required');
      return false;
    } else if (!nameRegex.test(name)) {
      setLastNameError('Last name contains invalid characters');
      return false;
    } else {
      setLastNameError('');
      return true;
    }
  }
  

  
  function validateEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) {
      setEmailError('Email address is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Email address is invalid');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  }

  
  function validatePassword(password) {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  }

  
  function validateRetypePassword(retypePassword, originalPassword) {
    console.log(retypePassword)
    console.log(originalPassword)

    console.log(retypePassword === originalPassword)

    if (!retypePassword) {
      setRetypePasswordError('Re-typing the password is required');
      return false;
    } else if (retypePassword === originalPassword) {
      setRetypePasswordError('');
      return true;
    } else {
      setRetypePasswordError('Passwords do not match');
      return false;
    }
  }
  

  
  const SubmitRec = async (e) => {
    e.preventDefault();
    console.log(userRec);

    const isFirstNameValid = validateFirstName(userRec.fname);
    const isLastNameValid = validateLastName(userRec.lname);
    const isEmailValid = validateEmail(userRec.email);
    const isPasswordValid = validatePassword(userRec.password);
    const isRetypePasswordValid = validateRetypePassword(document.getElementById("pwordRetype").value, userRec.password);
  
    if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPasswordValid || !isRetypePasswordValid) {
      return;
    }

    let pwordRetype = document.getElementById("pwordRetype").value;
    console.log(userRec.password)
    console.log(pwordRetype)
    if (pwordRetype !== userRec.password) {
      alert("Passwords do not match");
      document.getElementById("pwordRetype").value = "";
      setUserRec({ ...userRec, password: "" });
      return;
    }

    await axios
      .post("https://bookepedia-qta8.onrender.com/user/register/", userRec)
      .then((res) => {
        
        console.log(res.data.message);
        console.log("success");
        if(res.data.message == "exists"){
          alert(`An account with the email ${userRec.email} already exists`);
        }else{
          alert(`Thank you ${userRec.fname}, your account has been created`);
          navigate("/");
        }
        
      })
      .catch((err) => {
        console.log(err);
        alert("Please try again, an error occurred");
      });
  };

  return (
    <div style={{ margin:"90px" }}>
      <img alt="logo" src={logo} className="mx-auto d-block" />
      <Form
        onSubmit={SubmitRec}
        style={{ maxWidth: "450px", padding: "30px" }}
        className="mx-auto d-block border border-2"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            onChange={onchange}
            value={userRec.fname}
            name="fname"
            type="text"
            placeholder="Enter First Name"
          />  
          {firstNameError && <div style={{ color: 'red' }}>{firstNameError}</div>}

        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            onChange={onchange}
            value={userRec.lname}
            name="lname"
            type="text"
            placeholder="Enter Last Name"
          />
            {lastNameError && <div style={{ color: 'red' }}>{lastNameError}</div>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            onChange={onchange}
            value={userRec.email}
            name="email"
            type="email"
            placeholder="Enter email"
          />
            {emailError && <div style={{ color: 'red' }}>{emailError}</div>}

          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            onChange={onchange}
            value={userRec.password}
            name="password"
            type="password"
            placeholder="Password"
          />  
          {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}

        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Re-type Password</Form.Label>
          <Form.Control
            name="pwordRetype"
            id = "pwordRetype"
            required
            onChange={onchange}
            type="password"
            placeholder="Password"
          />
            {retypePasswordError && <div style={{ color: 'red' }}>{retypePasswordError}</div>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
