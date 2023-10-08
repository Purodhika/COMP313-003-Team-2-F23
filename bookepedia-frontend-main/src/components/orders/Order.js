import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import accountContext from "../userAccounts/accountContext";

export default function Order({ order, setOrders }) {
  let navigate = useNavigate();

  const { userType } = React.useContext(accountContext);

  function deleteRecord() {
    axios
      .delete(`http://localhost:3500/orders/delete-order/${order._id}`)
      .then((res) => navigate("/home"))
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateStatus(status, id) {
    try {
      await axios.put(`http://localhost:3500/orders/statusUpdate/${id}`, {
        status,
      });

      axios
        .get("http://localhost:3500/orders")
        .then((res) => setOrders(res.data))
        .catch((err) => console.error(err));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card style={{ width: "80%", padding: "30dp" }}>
      <Card.Body>
        <Card.Title>Order ID: {order._id}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Buyer: {order.buyerEmail}
          {"  "}
          <Button
            href={`mailto:${order.buyerEmail}?Subject=Bookepedia%20Order%20`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Email Buyer
          </Button>
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Seller: {order.sellerEmail}
          {"  "}
          <Button
            href={`mailto:${order.sellerEmail}?Subject=Bookepedia%20Order%20`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Email Seller
          </Button>
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Condition Guarantee: {order.conditionVerification}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Order Status: {order.status}
        </Card.Subtitle>
        <Button
          variant="primary"
          onClick={() => updateStatus("Shipped", order._id)}
        >
          Shipped
        </Button>{" "}
        <Button
          variant="primary"
          onClick={() => updateStatus("Delivered", order._id)}
        >
          Delivered
        </Button>
        <br />
        <br />
        {userType === "DELIVERY" ? (
          <Button variant="danger" onClick={deleteRecord}>
            Delete
          </Button>
        ) : (
          <div></div>
        )}
      </Card.Body>
    </Card>
  );
}
