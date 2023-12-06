import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Register from "./userAccounts/Register";
import Login from "./userAccounts/Login";
import accountContext from "./userAccounts/accountContext";
import BookUpload from "./BookUpload";
import Home from "./Home";
import AccountDetails from "./userAccounts/AccountDetails";
import AccountList from "./userAccounts/AccountList";
import EditAccount from "./userAccounts/EditAccount";
import CardInfo from "./cardInfo/CardInfo";
import AllListings from "./Listings/AllListings";
import BookDetails from "./Listings/BookDetails";
import OrderListings from "./orders/orderListings";
import OrderSummary from "./orders/OrderSummary";
import UserOrders from "./orders/UserOrders";
import EditListing from "./Listings/EditListing";

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [userType, setUserType] = useState("USER");
  const [userEmail, setUserEmail] = useState("");

  return (
    <accountContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        userType,
        setUserType,
        userEmail,
        setUserEmail,
      }}
    >
      <Router>
        <div className="App">
          <NavBar />
        </div>
        <div style={{ marginTop: "90px" }}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/upload" element={<BookUpload />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/account-details" element={<AccountDetails />}></Route>
            <Route path="/all-accounts" element={<AccountList />}></Route>
            <Route path="/listings" element={<AllListings />}></Route>
            <Route path="/book-details/:_id" element={<BookDetails />}></Route>
            <Route path="/edit/:id" element={<EditListing />}> </Route>
            <Route
              path="/order-summary/:_id"
              element={<OrderSummary />}
            ></Route>
            <Route
              path="/edit-account/:email"
              element={<EditAccount />}
            ></Route>
            <Route
              path="/edit-account/:email"
              element={<EditAccount />}
            ></Route>
            <Route path="/order-list" element={<OrderListings />}></Route>
            <Route path="/your-orders" element={<UserOrders />}></Route>
          </Routes>
        </div>
      </Router>
    </accountContext.Provider>
  );
}

export default App;
