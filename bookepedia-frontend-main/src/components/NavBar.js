import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

import React from "react";
import accountContext from "./userAccounts/accountContext";
//import NavDropdown from "react-bootstrap/NavDropdown";

import logo from "./media/bookepedia.gif";

function NavBar(props) {
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
      style={{ background: "#0047a9" }}
    >
      <Container fluid>
        <Navbar.Brand>
          <LinkContainer to="home">
            <img
              alt="logo"
              src={logo}
              width="75"
              className="d-inline-block align-top"
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
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {userType === "ADMIN" && loggedIn ? (
              <LinkContainer to="listings">
                <Nav.Link>All Listings</Nav.Link>
              </LinkContainer>
            ) : (
              <div></div>
            )}
            {userType === "USER" && loggedIn ? (
              <LinkContainer to="listings">
                <Nav.Link>Your Listings</Nav.Link>
              </LinkContainer>
            ) : (
              <div></div>
            )}

            {userType === "USER" && loggedIn ? (
              <LinkContainer to="your-orders">
                <Nav.Link>Your Orders</Nav.Link>
              </LinkContainer>
            ) : (
              <div></div>
            )}
          </Nav>
          {/*<Nav.Link href="#">Link</Nav.Link>*/}

          <Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="success">Search</Button>
            </Form>

            {userType === "USER" && loggedIn ? (
              <LinkContainer to="upload">
                <Nav.Link>Add Book +</Nav.Link>
              </LinkContainer>
            ) : (
              <div></div>
            )}

            {userType === "ADMIN" ? (
              <LinkContainer to="/all-accounts">
                <Nav.Link>Accounts</Nav.Link>
              </LinkContainer>
            ) : (
              <div></div>
            )}

            {userType === "DELIVERY" ? (
              <LinkContainer to="/order-list">
                <Nav.Link>Orders</Nav.Link>
              </LinkContainer>
            ) : (
              <div></div>
            )}

            {/* 
              Adding conditional rendering depending if user is logged in
            */}

            {loggedIn ? (
              <LinkContainer to="account-details">
                <Nav.Link>My Account</Nav.Link>
              </LinkContainer>
            ) : (
              <div></div>
            )}

            {loggedIn ? (
              <div></div>
            ) : (
              <LinkContainer to="register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            )}

            {loggedIn ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <LinkContainer to="login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
