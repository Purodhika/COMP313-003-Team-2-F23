import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Account from "./Account";
import accountContext from "./accountContext";

export default function AccountList() {
  let navigate = useNavigate();
  const [allAccounts, setAllAccounts] = useState([]);

  useEffect(() => {
    axios
      .get("https://bookepedia-qta8.onrender.com/user/")
      .then((res) => {
        setAllAccounts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "10px",
    background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
    // Add any additional styling you want
  }}>
    <div style={{
      textAlign: "center",
      maxWidth: "600px", // Adjust the width as needed
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
      background: "rgba(255, 255, 255, 0.8)", // Add a semi-transparent white background
    }}>
      <h1 style={{ marginBottom: "20px" }}>All Accounts</h1>
      <div style={{ padding: "10px" }}>
        {allAccounts.map((account, index) => (
          <React.Fragment key={account._id}>
            <Account user={account} />
            {index !== allAccounts.length - 1 && <div style={{ marginBottom: "10px" }}></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div> );
}
