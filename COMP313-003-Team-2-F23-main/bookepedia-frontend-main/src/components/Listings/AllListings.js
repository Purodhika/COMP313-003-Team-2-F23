import React, { useState, useEffect } from "react";
import axios from "axios";
import Listing from "./Listing";
import accountContext from "../userAccounts/accountContext";

export default function AllListings() {
  const [allListings, setAllListings] = useState([]);
  const { userEmail, userType } = React.useContext(accountContext);

  useEffect(() => {
    axios
      .get("https://bookepedia-qta8.onrender.com/user/listings")
      .then((res) => {
        setAllListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center",margin: "1px",
    background: "rgb(238,174,202)",
    background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
    // Replace with your desired color
    minHeight: "100vh", }}>
      {userType === "ADMIN" ? <h1 style={{ color: "#3498db" }}>All Listings</h1> : <h1 style={{ color: "#27ae60" }}>Your Listings</h1>}

      {userType !== "ADMIN"
        ? allListings.map((listing) =>
            listing.sellerEmail === userEmail ? (
              <Listing 
                key={listing._id}
                book={listing}
                setAllListings={setAllListings}
                style={{
                  display: "flex", flexWrap: "wrap", justifyContent: "center",
                  border: "1px solid #ddd",
                  borderRadius: "15px",
                  margin: "10px",
                  padding: "15px",
                  maxWidth: "300px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            ) : (
              <div></div>
            )
          )
        : allListings.map((listing) => (
            <Listing
              key={listing._id}
              book={listing}
              setAllListings={setAllListings}
            />
          ))}
    </div>
  );
}
