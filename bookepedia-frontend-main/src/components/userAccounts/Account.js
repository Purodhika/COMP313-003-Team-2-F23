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
    <Card style={{ width: "18rem", minHeight: "10vh",
    background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)", }}>
      <Card.Body>
        <Card.Title>
          {user.fname} {user.lname} - {user.userType}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
        <Button variant="primary" value={user.email} onClick={handleEdit} 
          style={{
            
            background: "#3498db",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
            marginRight:"1cm"
          }}
          onMouseOver={(e) => (e.target.style.background = "#2980b9")}
          onMouseOut={(e) => (e.target.style.background = "#3498db")}>
          Edit
        </Button>
        
        <Button variant="danger" onClick={deleteRecord}style={{
              background: "#e74c3c",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#c0392b")}
            onMouseOut={(e) => (e.target.style.background = "#e74c3c")}
          >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}
