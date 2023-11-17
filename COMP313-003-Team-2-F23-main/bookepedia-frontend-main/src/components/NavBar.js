import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

import React from "react";
import accountContext from "./userAccounts/accountContext";
import logo from "./media/bookepedia.gif";

function NavBar() {
  let navigate = useNavigate();
  const { loggedIn, setLoggedIn, userType, setUserType, setUserEmail } =
    React.useContext(accountContext);

  const handleLogout = () => {
    setUserEmail("");
    setUserType("USER");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <Navbar
      fixed="top"
      variant="dark"
      expand="lg"
      style={{
        background: "linear-gradient(to right, #2980B9, #87CEFA, #00BFFF)",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container fluid>
        <Navbar.Brand>
          <LinkContainer to="home">
            <img
              alt="logo"
              src={logo}
              width="75"
              className="d-inline-block align-top"
              style={{ background: "#008000" }}
            />
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            variant="pills"
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <LinkContainer to="home">
              <Nav.Link style={{ transition: "color 0.3s" }}>Home</Nav.Link>
            </LinkContainer>
            {userType === "ADMIN" && loggedIn ? (
              <LinkContainer to="listings">
                <Nav.Link style={{ transition: "color 0.3s" }}>All Listings</Nav.Link>
              </LinkContainer>
            ) : (
              <div></div>
            )}
            {userType === "USER" && loggedIn ? (
              <LinkContainer to="listings">
                <Nav.Link style={{ transition: "color 0.3s" }}>Your Listings</Nav.Link>
              </LinkContainer>
            ) : (
              <div></div>
            )}

            {userType === "USER" && loggedIn ? (
              <LinkContainer to="your-orders">
                <Nav.Link style={{ transition: "color 0.3s" }}>Your Orders</Nav.Link>
              </LinkContainer>
            ) : (
              <div></div>
            )}
          </Nav>

          <Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button
                variant="success"
                style={{
                  background: "#E76F51",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "20px", // Adjusted for round edges
                  cursor: "pointer",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#FFA726")}
                onMouseOut={(e) => (e.target.style.background = "#E76F51")}
              >
                Search
              </Button>
            </Form>

            {userType === "USER" && loggedIn ? (
              <LinkContainer to="upload">
                <Nav.Link style={{ transition: "color 0.3s" }}>Add Book +</Nav.Link>
              </LinkContainer>
            ) : (
              <div></div>
            )}

            {userType === "ADMIN" ? (
              <LinkContainer to="/all-accounts">
                <Nav.Link style={{ transition: "color 0.3s" }}>Accounts</Nav.Link>
              </LinkContainer>
            ) : (
              <div></div>
            )}

            {userType === "DELIVERY" ? (
              <LinkContainer to="/order-list">
                <Nav.Link style={{ transition: "color 0.3s" }}>Orders</Nav.Link>
              </LinkContainer>
            ) : (
              <div></div>
            )}

            {loggedIn ? (
              <LinkContainer to="account-details">
                <Nav.Link style={{ transition: "color 0.3s" }}>My Account</Nav.Link>
              </LinkContainer>
            ) : (
              <div></div>
            )}

            {loggedIn ? (
              <div></div>
            ) : (
              <LinkContainer to="register">
                <Nav.Link style={{ transition: "color 0.3s" }}>Register</Nav.Link>
              </LinkContainer>
            )}

            {loggedIn ? (
              <Nav.Link onClick={handleLogout} style={{ transition: "color 0.3s" }}>
                Logout
              </Nav.Link>
            ) : (
              <LinkContainer to="login">
                <Nav.Link style={{ transition: "color 0.3s" }}>Login</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
