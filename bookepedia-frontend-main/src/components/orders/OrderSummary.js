import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CardInfo from "../cardInfo/CardInfo";
import Button from "react-bootstrap/Button";
import accountContext from "../userAccounts/accountContext";

/**
 * Component to confirm order before final checkout
 */
export default function OrderSummary() {
  const [paymentValidated, setPaymentValidated] = useState(false);
  const [book, setBook] = useState({});
  const [seller, setSeller] = useState({});
  const { _id, conditionVerification } = useParams();
  let navigate = useNavigate();

  const { loggedIn, userEmail } = React.useContext(accountContext);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, []);

  //get book
  useEffect(() => {
    axios
      .get(`https://bookepedia-qta8.onrender.com/book/details/${_id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handlePurchase() {
    //create order object
    //try math the user email and seller's email
    if(userEmail == book.sellerEmail){
      alert("Same user! User Can not buy their own books");
      return;
    }

    var bodyData = {
      bookId: _id,
      buyerEmail: userEmail,
      sellerEmail: book.sellerEmail,
      isbn: book.isbn,
      price: book.price,
      conditionVerification:  conditionVerification ? "Yes" : "No"
      //conditionVerification: "Yes"
    };

    axios
      .post(`https://bookepedia-qta8.onrender.com/orders/add-order`, bodyData)
      .then((res) => {
        console.log(res.status);
        if (res.status === 201) {
          alert(`Order successful`);
          navigate("/");
        }
   
        else {
          alert(`Sorry, an error ocurred. Please try again later.`);
          navigate("/");
        }
      });
  }

  function handleCancel() {
    //navigate to home
    navigate("/")
  }

  return (
    <div>
     {paymentValidated ? (
        <div>
          <h1>Order Summary</h1>
          <p>
            Thank you for performing an order with BookEpedia! Please review the
            details of the order and confirm.
          </p>
          <h2>Book:</h2>
          <p>Title: {book.title}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Price: ${book.price}</p>
          <h2>Sold from:</h2>
          <p>{book.sellerEmail}</p>
          <Button variant="success" onClick={handlePurchase}>
            Confirm Order
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
     ) : (
      <div>
        <CardInfo setPaymentValidated={setPaymentValidated} />
      </div>
    )}
    </div>
  );
}
