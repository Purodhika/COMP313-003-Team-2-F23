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
      .delete(`http://localhost:3500/book/delete/${book._id}`)
      // .then((res) => navigate("/home"))
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get("http://localhost:3500/user/listings")
      .then((res) => {
        setAllListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

 

  return (
    <Card style={{ width: "25rem" }}>
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
          src={"http://localhost:3500/BookImagesUploaded/" + book.image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src =
              "http://localhost:3500/BookImagesUploaded/noImage.png";
          }}
        />
        <Card.Title>
          {book.title} by {book.authors}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">${book.price}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Sold by:{book.sellerEmail}
        </Card.Subtitle>
        <Button variant="primary" onClick={handleEdit}>
          Update
        </Button>
        {book.sold ? <Button variant="success">SOLD</Button> : <span></span>}
        {"  "}
        <Button variant="danger" onClick={deleteRecord}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
 }

