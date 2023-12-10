import React, { useState, useEffect } from "react";
import axios from "axios";
import Listing from "./Listing";
import accountContext from "../userAccounts/accountContext";

/**
 * Component to display all listings of a particular seller
 */
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
    <div style={{ textAlign: "center",margin: "1px",
    background: "rgb(238,174,202)",
    background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
    // Replace with your desired color
    minHeight: "100vh", }}>
  {userType === "ADMIN" ? (
    <h1 style={{ color: "#3498db" }}>All Listings</h1>
  ) : (
    <h1 style={{ color: "#27ae60" }}>Your Listings</h1>
  )}
<div style={{justifyContent:"center"}}>
  {userType !== "ADMIN"
    ? allListings.map((listing) =>
        listing.sellerEmail === userEmail ? (
          <div key={listing._id} style={{ padding:"10px"}}>
            {/* Other styling for each listing */}
            <Listing book={listing} setAllListings={setAllListings} />
          </div>
        ) : (
          <div key={listing._id}></div>
        )
      )
    : allListings.map((listing) => (
        <div key={listing._id} style={{ padding:"10px" }}>
          {/* Other styling for each listing */}
          <Listing book={listing} setAllListings={setAllListings} />
        </div>
      ))}
</div>
</div>
  );
}
