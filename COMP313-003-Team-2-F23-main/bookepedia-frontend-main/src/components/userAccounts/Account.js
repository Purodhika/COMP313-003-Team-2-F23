import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Account({ user }) {
  let navigate = useNavigate();

  function deleteRecord() {
    axios
      .delete(`https://bookepedia-qta8.onrender.com/user/${user.email}`)
      .then((res) => navigate("/home"))
      .catch((err) => {
        console.log(err);
      });
  }
  function handleEdit(event) {
    navigate(`/edit-account/${event.target.value}`, true);
  }

  return (
    <Card style={{ width: "18rem", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <Card.Body>
        <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "5px" }}>
          {user.fname} {user.lname}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.userType}</Card.Subtitle>
        <Card.Text>{user.email}</Card.Text>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <Button
            variant="primary"
            onClick={handleEdit}
            style={{
              backgroundColor: "#3498db",
              color: "#fff",
              padding: "8px 15px",
              borderRadius: "20px",
              cursor: "pointer",
              transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={deleteRecord}
            style={{
              backgroundColor: "#e74c3c",
              color: "#fff",
              padding: "8px 15px",
              borderRadius: "20px",
              cursor: "pointer",
              transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
            }}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
