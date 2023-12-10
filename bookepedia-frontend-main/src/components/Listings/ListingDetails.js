import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import logo from "./media/bookepedia.gif";
import { useNavigate } from "react-router-dom";
import accountContext from "./userAccounts/accountContextaccountContext";

/**
 * Component representing book listings
 */
function ShowListing(props) {
    const { userEmail } = React.useContext(accountContext);
  const [bookRec, setBookRec] = React.useState({
    title: "",
    isbn: "",
    authors: "",
    genre: "",
    price: undefined,
    description: "",
    sellerEmail: userEmail,
    latitude: "",
    longitude: ""
  });

  let navigate = useNavigate();

  const onchange = (e) => {
    setBookRec({ ...bookRec, [e.target.name]: e.target.value });
  };

  const SubmitRec = async (e) => {
    e.preventDefault();
    console.log(bookRec);

    await axios
      .post("https://bookepedia-qta8.onrender.com/book/upload/", bookRec)
      .then((res) => {
        console.log("success");
        alert(`The Book "${bookRec.title}" has been uploaded successfully`);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Please try again, an error occurred");
      });
  };

  return (
    <>
      <img
        alt="logo"
        src={logo}
        className="mx-auto d-block"
        style={{ width: "130px" }}
      />
      <h1
        className="text-center border border-2"
        style={{ padding: "10px", background: "#0084ab52" }}
      >
        Book Upload
      </h1>

      <Form
        onSubmit={SubmitRec}
        style={{ padding: "30px" }}
        className="mx-auto d-block border border-2"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={onchange}
            value={bookRec.title}
            name="title"
            type="text"
            placeholder="Enter Book Title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={onchange}
            value={bookRec.isbn}
            name="isbn"
            type="text"
            placeholder="Enter ISBN"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Author(s)</Form.Label>
          <Form.Control
            onChange={onchange}
            value={bookRec.authors}
            name="authors"
            type="text"
            placeholder="Enter Authors"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <div style={{ width: "45%", display: "inline-block" }}>
            <Form.Label>Genre</Form.Label>
            <Form.Control
              onChange={onchange}
              value={bookRec.genre}
              name="genre"
              type="text"
              placeholder="Enter Genre"
            />
          </div>

          <div
            style={{ width: "45%", display: "inline-block", marginLeft: "10%" }}
          >
            <Form.Label>Price</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <InputGroup.Text>0.00</InputGroup.Text>
              <Form.Control
                onChange={onchange}
                value={bookRec.price}
                name="price"
                type="number"
                placeholder="Enter Price"
                min="0"
                step=".01"
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            placeholder="Enter Book Description"
            onChange={onchange}
            value={bookRec.description}
            name="description"
            as="textarea"
            rows={4}
          />
        </Form.Group>
      </Form>
    </>
  );
}

export default ShowListing;
