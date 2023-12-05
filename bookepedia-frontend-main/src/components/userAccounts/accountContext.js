import React from "react";

const accountContext = React.createContext({
  loggedIn: window.sessionStorage.getItem("loggedIn"),
  setLoggedIn: (value) => {
    window.sessionStorage.setItem("loggedIn", value);
  },
  userType: "user",
  setUserType: (user) => {
    this.userType = user;
  },
  userEmail: "",
  setUserEmail: (email) => {
    this.userEmail = email;
  },
});

export default accountContext;
