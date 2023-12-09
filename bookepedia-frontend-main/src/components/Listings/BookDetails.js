import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { GOOGLE_MAPS_API_KEY } from "../config";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { loadStripe } from "@stripe/stripe-js";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

export default function BookDetails() {
  let navigate = useNavigate();
  const { _id } = useParams();
  const [book, setBook] = useState();
  const [conditionVerification, setConditionVerification] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null); // State for selected location

  useEffect(() => {
    axios
      .get(`https://bookepedia-qta8.onrender.com/book/details/${_id}`)
      .then((res) => {
        setBook(res.data);
        setSelectedLocation({
          lat: res.data.latitude,
          lng: res.data.longitude,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  return (
    <>
      {book ? (
        <div style={{ margin: "20px" }}>
          <br />
          <img
            style={{
              width: "35%",
              borderRadius: "50px",
              maxHeight: "500px",
              objectFit: "contain",
              border: "5px solid #0047a9",
              float: "left",
            }}
            src={
              "https://bookepedia-qta8.onrender.com/BookImagesUploaded/" +
              book.image
            }
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://bookepedia-qta8.onrender.com/BookImagesUploaded/noImage.png";
            }}
            alt={"book cover"}
          />
          <div style={{ marginLeft: "30px", float: "left", width: "45%" }}>
            <h1 style={{ marginBottom: "0px" }}>{book.title}</h1>
            <i>by {book.authors}</i>
            <br />
            <br />
            <p>Condition: {book.condition}</p>
            <hr />
            <p>{book.description}</p>
            <hr />
            <Button
              variant="primary"
              onClick={() => navigate("/book-details/" + book._id)}
              style={{
                background: "#3498db", // Bluish color
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "20px", // Adjusted for round edges
                cursor: "pointer",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#2980b9")} // Lighter bluish color on hover
              onMouseOut={(e) => (e.target.style.background = "#3498db")}
            >
            
              
            
              Price: ${book.price.toFixed(2)}
            </Button>

            {"         "}
            {book.sold ? (
               <Button variant="danger"   style={{
                background: "#e74c3c", // Red color
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "20px", // Adjusted for round edges
                cursor: "pointer",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#c0392b")} // Darker red color on hover
              onMouseOut={(e) => (e.target.style.background = "#e74c3c")}
            >SOLD</Button>
            ) : (
              <>
                <Button variant="primary" onClick={() =>
                    navigate(
                      `/order-summary/${book._id}/${conditionVerification}`
                    )
                }>
                  Buy
                </Button>
                <Form.Check
                  type="checkbox"
                  id="conditionVerify"
                  label="Condition Guarantee +$5"
                  checked={conditionVerification}
                  onChange={(event) =>
                    setConditionVerification(event.target.checked)
                  }
                />
              </>
            )}
            {"         "}
            <Button

            href={`mailto:${book.sellerEmail}?Subject=Bookepedia%20Order%20`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#3498db", // Bluish color
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "20px", // Adjusted for round edges
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#2980b9")} // Lighter bluish color on hover
            onMouseOut={(e) => (e.target.style.background = "#3498db")}
          >
            Email Seller
          </Button>
            <br />
            <small className="text-muted">Book viewed {book.views} times</small>
            <br />
            <br />
            <p>
              <b>Genre:</b> {book.genre} <br />
              <b>ISBN:</b> {book.isbn} <br />
              <b>Sold by:</b> {book.sellerEmail} <br />
              <b>Date Added:</b>{" "}
              {new Date(book.dateAdded).toLocaleString("en-CA")}
              <br />
            </p>
            {/* Display the map with the selected location */}
            {isLoaded && selectedLocation ? (
              <div style={{ width: "100%", height: "300px" }}>
                <GoogleMap
                  center={selectedLocation}
                  zoom={18}
                  mapContainerStyle={{ height: "100%", width: "100%" }}
                >
                  {selectedLocation && <MarkerF position={selectedLocation} />}
                </GoogleMap>
              </div>
            ) : null}
            <br />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
