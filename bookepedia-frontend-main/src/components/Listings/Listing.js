import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";


export default function Listing({ book, setAllListings }) {
  let navigate = useNavigate();

  async function handleEdit() {
    navigate(`/edit/${book._id}`, { state: { book } });
  }
  
  async function deleteRecord() {
    await axios
      .delete(`https://bookepedia-qta8.onrender.com/book/delete/${book._id}`)
      // .then((res) => navigate("/home"))
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get("https://bookepedia-qta8.onrender.com/user/listings")
      .then((res) => {
        setAllListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

 

  return (
    <Card style={{ width: "50rem", minHeight: "5vh",
    padding: "10px",
    background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)", }}>
      <Card.Body>
        <Card.Img
          style={{
            width: "20%",
            float: "left",
            marginRight: "20px",
            maxHeight: "200px",
            minHeight: "65px",
            objectFit: "contain",
          }}
          src={"https://bookepedia-qta8.onrender.com/BookImagesUploaded/" + book.image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src =
              "https://bookepedia-qta8.onrender.com/BookImagesUploaded/noImage.png";
          }}
        />
        <Card.Title>
          {book.title} by {book.authors}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">${book.price}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Sold by:{book.sellerEmail}
        </Card.Subtitle>
        <Button variant="primary" onClick={handleEdit}
          style={{
            background: "#3498db",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
            marginRight:"10px"
          }}
          onMouseOver={(e) => (e.target.style.background = "#2980b9")}
          onMouseOut={(e) => (e.target.style.background = "#3498db")}>
          Update
        </Button>
        {book.sold ? <Button variant="success" style={{
    background: "#2ecc71",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
    marginLeft: "10px",
  }}
  onMouseOver={(e) => (e.target.style.background = "#27ae60")}
  onMouseOut={(e) => (e.target.style.background = "#2ecc71")}>SOLD</Button> : <span></span>}
        {"  "}
        <Button variant="danger" onClick={deleteRecord}style={{
              background: "#e74c3c",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
              marginLeft:"10px"
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

