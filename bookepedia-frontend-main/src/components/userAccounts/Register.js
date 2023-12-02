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
    userType: "USER",
  });

  let navigate = useNavigate();

  const onchange = (e) => {
    setUserRec({ ...userRec, [e.target.name]: e.target.value });
  };

  const SubmitRec = async (e) => {
    e.preventDefault();
    console.log(userRec);
    console.log("Submitting with userType:", userRec.userType);

    let pwordRetype = document.getElementById("pwordRetype").value;

    if (pwordRetype !== userRec.password) {
      alert("Passwords do not match");
      document.getElementById("pwordRetype").value = "";
      setUserRec({ ...userRec, password: "" });
      return;
    }

    await axios
      .post("http://127.0.0.1:3500/user/register/", userRec)
      .then((res) => {
        console.log(userRec);
        console.log(res.data.message);
        console.log("success");
        if(res.data.message === "exists"){
          alert(`An account with the email ${userRec.email} already exists`);
        }else{
          alert(`Thank you ${userRec.fname}, your account has been created`);
          //navigate("/");
        }
        
      })
      .catch((err) => {
        console.log(err);
        alert("Please try again, an error occurred");
      });
      navigate("/");
  };

  return (
    <div style={{ margin:"90px" }}>
      <img alt="logo" src={logo} className="mx-auto d-block" />
      <Form
        onSubmit={SubmitRec}
        style={{ maxWidth: "450px", padding: "30px" }}
        className="mx-auto d-block border border-2"
      >
        <Form.Group className="mb-3" controlId="formBasicFistname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            onChange={onchange}
            value={userRec.fname}
            name="fname"
            type="text"
            placeholder="Enter First Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            onChange={onchange}
            value={userRec.lname}
            name="lname"
            type="text"
            placeholder="Enter Last Name"
          />
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
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            onChange={onchange}
            value={userRec.password}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordRetype">
          <Form.Label>Re-type Password</Form.Label>
          <Form.Control
            id="pwordRetype"
            required
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUserType">
          <Form.Label>Account Type</Form.Label>
          <Form.Control
            required
            as="select"
            name="userType"
            type="text"
            value={userRec.userType}
            onChange={onchange}
          >
            <option value="USER">USER</option>
            <option value="DELIVERY">DELIVERY</option>            
            <option value="ADMIN">ADMIN</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;