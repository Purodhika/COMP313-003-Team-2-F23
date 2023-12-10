import React from "react";

const accountContext = React.createContext({
  loggedIn: true,
  setLoggedIn: (value) => {
    this.loggedIn = value;
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
