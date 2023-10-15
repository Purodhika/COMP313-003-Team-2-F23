import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";
import { useState } from "react"; 
//import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"; // Import Google Map components
import { GOOGLE_MAPS_API_KEY } from "./config"; 


import logo from "./media/bookepedia.gif";
import accountContext from "./userAccounts/accountContext";
import { useNavigate } from "react-router-dom";

function BookUpload(props) {
  const { userEmail } = React.useContext(accountContext);
  
  const [bookRec, setBookRec] = React.useState({
    title: "",
    isbn: "",
    authors: "",
    genre: "",
    price: "",
    description: "",
    sellerEmail: userEmail,
    condition: ""
  });

  const [file, setFile] = React.useState();

  let navigate = useNavigate();

  const onchange = (e) => {
    setBookRec({ ...bookRec, [e.target.name]: e.target.value });
  };
  const [markerPosition, setMarkerPosition] = useState(null); // State to store the selected location

  const onMapClick = (e) => {
    setMarkerPosition(e.latLng);
    setBookRec({ ...bookRec, location: `${e.latLng.lat()}, ${e.latLng.lng()}` });
          };
          
  const SubmitRec = async (e) => {
    e.preventDefault();
    console.log(file);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", bookRec.title);
    formData.append("isbn", bookRec.isbn);
    formData.append("authors", bookRec.authors);
    formData.append("genre", bookRec.genre);
    formData.append("price", bookRec.price);
    formData.append("description", bookRec.description);
    formData.append("sellerEmail", bookRec.sellerEmail);
    formData.append("condition", bookRec.condition);
    
    //formData.append("bookRec", bookRec);

    const result = await axios
      .post("http://localhost:3500/book/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("success");
        alert(`The Book "${bookRec.title}" has been uploaded successfully`);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Please try again, an error occurred");
      });
    //console.log(result.data);

  };

  return (
    <div style={{margin:"90px"}}>
      <img
        alt="logo"
        src={logo}
        className="mx-auto d-block"
        style={{ width: "130px" }}
      />
      <h1
        className="text-center border border-2"
        style={{ padding: "10px", background: "#0084ab52" }}
      >
        Book Upload
      </h1>

      <Form
        encType="multipart/form-data"
        onSubmit={SubmitRec}
        style={{ padding: "30px" }}
        className="mx-auto d-block border border-2"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={onchange}
            value={bookRec.title}
            name="title"
            type="text"
            placeholder="Enter Book Title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={onchange}
            value={bookRec.isbn}
            name="isbn"
            type="text"
            placeholder="Enter ISBN"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Author(s)</Form.Label>
          <Form.Control
            onChange={onchange}
            value={bookRec.authors}
            name="authors"
            type="text"
            placeholder="Enter Authors"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <div style={{ width: "45%", display: "inline-block" }}>
            <Form.Label>Genre</Form.Label>
            <Form.Select
              onChange={onchange}
              value={bookRec.genre}
              name="genre"            
              
              aria-label="Default select example"
            >
              <option>Open this select menu</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Text-Book">Text-Book</option>
              <option value="other">other</option>
            </Form.Select>
          </div>

          <div
            style={{ width: "45%", display: "inline-block", marginLeft: "10%" }}
          >
            <Form.Label>Price</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <InputGroup.Text>0.00</InputGroup.Text>
              <Form.Control
                onChange={onchange}
                value={bookRec.price}
                name="price"
                type="number"
                placeholder="Enter Price"
                min="0"
                step=".01"
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
          </div>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicEmail">
        <div style={{ width: "45%", display: "inline-block" }}>
            <Form.Label>Condition</Form.Label>
            <Form.Select
              onChange={onchange}
              value={bookRec.condition}
              name="condition"           
              
              aria-label="Default select example"
            >
              <option>Open this select menu</option>
              <option value="New">New</option>
              <option value="Used (Excellent)">Used (Excellent)</option>
              <option value="Used (Good)">Used (Good)</option>
              <option value="Other">Other</option>
            </Form.Select>
          </div>
        </Form.Group>


        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            placeholder="Enter Book Description"
            onChange={onchange}
            value={bookRec.description}
            name="description"
            as="textarea"
            rows={4}
          />
        </Form.Group>

        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Upload Book Image</Form.Label>
          <Form.Control
            
            filename={file}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <Image
            thumbnail
            src={file ? URL.createObjectURL(file) : ""}
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              objectFit: "contain",
            }}
          />
        </Form.Group>

        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Seller Location</Form.Label>
           <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
            center={{ lat: 0, lng: 0 }} // Center the map initially at a default location
            zoom={5} // Set the initial zoom level
            onClick={onMapClick} // Attach the click event handler
            // Add any other map options here, such as apiKey, libraries, etc.
            >
            {markerPosition && (
              <Marker
                position={markerPosition}
                // You can customize the marker icon if needed
              />
            )}
          </GoogleMap>
        </LoadScript>
        </Form.Group>
        <Button variant="primary" type="submit">
          Upload Book
        </Button>

        <Button
          variant="danger"
          type="button"
          style={{ marginLeft: "20px" }}
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default BookUpload;
