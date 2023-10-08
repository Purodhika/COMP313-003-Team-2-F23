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

  let navigate = useNavigate();

  const onchange = (e) => {
    setUserRec({ ...userRec, [e.target.name]: e.target.value });
  };

  const SubmitRec = async (e) => {
    e.preventDefault();
    console.log(userRec);

    let pwordRetype = document.getElementById("pwordRetype").value;

    if (pwordRetype !== userRec.password) {
      alert("Passwords do not match");
      document.getElementById("pwordRetype").value = "";
      setUserRec({ ...userRec, password: "" });
      return;
    }

    await axios
      .post("http://localhost:3500/user/register/", userRec)
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-type Password</Form.Label>
          <Form.Control
            id="pwordRetype"
            required
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
