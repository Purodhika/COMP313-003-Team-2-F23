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
      .get("http://localhost:3500/user/")
      .then((res) => {
        setAllAccounts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>All Accounts</h1>
      {allAccounts.map((account) => (
        <Account key={account._id} user={account} />
      ))}
    </div>
  );
}
