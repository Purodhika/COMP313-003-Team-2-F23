import React, { useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import logo from "./media/bookepedia.gif";
import accountContext from "./userAccounts/accountContext";
import { useNavigate } from "react-router-dom";
import "./BookUpload.css";
import { GOOGLE_MAPS_API_KEY } from "./config";

/**
 * Component to add a new book by seller.
 * Posts book details to the server.
 */

function BookUpload() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const newCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCenter(newCenter);
      setMarkerPosition(newCenter);
    });
  }, []);

  const onMapClick = (e) => {
    setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const { userEmail } = React.useContext(accountContext);

  const [bookRec, setBookRec] = React.useState({
    title: "",
    isbn: "",
    authors: "",
    genre: "",
    price: "",
    description: "",
    sellerEmail: userEmail,
    condition: "",
  });

  const [file, setFile] = React.useState();

  let navigate = useNavigate();

  const onchange = (e) => {
    setBookRec({ ...bookRec, [e.target.name]: e.target.value });
  };

  const SubmitRec = async (e) => {
    e.preventDefault();

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
    formData.append("latitude", markerPosition.lat);
    formData.append("longitude", markerPosition.lng);

    try {
      const result = await axios.post(
        "https://bookepedia-qta8.onrender.com/book/upload/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("success");
      alert(`The Book "${bookRec.title}" has been uploaded successfully`);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Please try again, an error occurred");
    }
  };

  return (
    <div style={{ margin: "90px", textAlign: "center",margin: "1px",
    background: "rgb(238,174,202)",
    background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
    // Replace with your desired color
    minHeight: "100vh", }}>
      <img alt="logo" src={logo} className="mx-auto d-block" style={{ width: "130px", marginBottom: "20px" }} />
      <h3
  className="text-center border border-2"
  style={{
    padding: "10px",
    borderRadius: "10px",
    margin: "10px",
    transition: "background-color 0.3s ease-in-out", // Added transition for smooth color change
    background: "#0084ab52",
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "#007399")} // Change background color on hover
  onMouseOut={(e) => (e.target.style.backgroundColor = "#0084ab52")} // Restore original color on mouse out
>
        Upload your book
      </h3>

      <Form
        encType="multipart/form-data"
        onSubmit={SubmitRec}
        style={{ padding: "30px", border: "1px solid #ddd", borderRadius: "15px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
        className="mx-auto d-block border border-2"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail"style={{ textAlign: "left" }}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={onchange}
            value={bookRec.title}
            name="title"
            type="text"
            placeholder="Enter Book Title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail"style={{ textAlign: "left" }}>
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={onchange}
            value={bookRec.isbn}
            name="isbn"
            type="text"
            placeholder="Enter ISBN"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail"style={{ textAlign: "left" }}>
          <Form.Label>Author(s)</Form.Label>
          <Form.Control
            onChange={onchange}
            value={bookRec.authors}
            name="authors"
            type="text"
            placeholder="Enter Authors"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword"style={{ textAlign: "left" }}>
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


        <Form.Group className="mb-3" controlId="formBasicEmail"style={{ textAlign: "left" }}>
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


        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"style={{ textAlign: "left" }}>
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

        <Form.Group controlId="formFileLg" className="mb-3"style={{ textAlign: "left" }}>
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
             
      <div>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={18}
          onClick={onMapClick}
          >
           {markerPosition && (
              <MarkerF
                position={markerPosition}
                draggable={true}
                onDragEnd={(e) =>
                  setMarkerPosition({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  })
                }
              />
            )}  
        </GoogleMap>
      )}
    </div>
        </Form.Group>
        <Button
  variant="primary"
  type="submit"
  style={{
    background: "linear-gradient(to right, #3498db, #5bafde)",
    color: "#fff",
    padding: "10px 20px",
    margin: "20px 10px 20px 0", // Adjusted margin
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
  }}
  onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
>
  Upload Book
</Button>

<Button
  variant="danger"
  type="button"
  style={{
    background: "#ff0000",
    color: "#fff",
    padding: "10px 20px",
    margin: "20px 0", // Adjusted margin
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
  }}
  onClick={() => navigate("/")}
  onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
>
  Cancel
</Button>

      </Form>
    </div>
  );
}

export default BookUpload;
