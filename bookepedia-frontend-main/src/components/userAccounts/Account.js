import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Account({ user }) {
  let navigate = useNavigate();

  function deleteRecord() {
    axios
      .delete(`http://localhost:3500/user/${user.email}`)
      .then((res) => navigate("/home"))
      .catch((err) => {
        console.log(err);
      });
  }
  function handleEdit(event) {
    navigate(`/edit-account/${event.target.value}`, true);
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          {user.fname} {user.lname} - {user.userType}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
        <Button variant="primary" value={user.email} onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={deleteRecord}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}
