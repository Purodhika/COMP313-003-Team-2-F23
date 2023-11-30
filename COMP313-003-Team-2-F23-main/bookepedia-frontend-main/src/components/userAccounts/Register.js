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

    let pwordRetype = document.getElementById("pwordRetype").value;

    if (pwordRetype !== userRec.password) {
      alert("Passwords do not match");
      document.getElementById("pwordRetype").value = "";
      setUserRec({ ...userRec, password: "" });
      return;
    }

    try {
      const res = await axios.post(
        "https://bookepedia-qta8.onrender.com/user/register/",
        userRec
      );

      console.log(res.data.message);

      if (res.data.message === "exists") {
        alert(`An account with the email ${userRec.email} already exists`);
      } else {
        alert(`Thank you ${userRec.fname}, your account has been created`);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("Please try again, an error occurred");
    }
  };

  return (
    <div style={{ margin: "1px", textAlign: "center",background: "rgb(238,174,202)",
    background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)" }}>
      <img alt="logo" src={logo} className="mx-auto d-block" style={{ width: "200px" }} />
      <Form
        onSubmit={SubmitRec}
        style={{
          maxWidth: "450px",
          padding: "30px",
          margin: "auto",
          border: "1px solid #ddd",
          borderRadius: "15px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form.Group className="mb-3" style={{ textAlign: "left" }}>
          <Form.Label >First Name</Form.Label>
          <Form.Control
            required
            onChange={onchange}
            value={userRec.fname}
            name="fname"
            type="text"
            placeholder="Enter First Name"
          />
        </Form.Group>
        <Form.Group className="mb-3"style={{ textAlign: "left" }}>
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

        <Form.Group className="mb-3" style={{ textAlign: "left" }}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            onChange={onchange}
            value={userRec.email}
            name="email"
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted" style={{ textAlign: "left" }}>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3"style={{ textAlign: "left" }}>
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

        <Form.Group className="mb-3"style={{ textAlign: "left" }}>
          <Form.Label>Re-type Password</Form.Label>
          <Form.Control
            id="pwordRetype"
            required
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button
  variant="primary"
  type="submit"
  style={{
    background: "linear-gradient(to right, #3498db, #5bafde)", // Gradient background
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
  }}
  onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
>
  Register
</Button>

      </Form>
    </div>
  );
}

export default Register;
