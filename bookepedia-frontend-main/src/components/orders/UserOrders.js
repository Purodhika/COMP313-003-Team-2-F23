import React, { useState, useEffect } from "react";
import axios from "axios";
import Order from "./Order";
import accountContext from "../userAccounts/accountContext";
import Card from "react-bootstrap/Card";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  const { userEmail } = React.useContext(accountContext);

  useEffect(() => {
    axios
      .get(`https://bookepedia-qta8.onrender.com/orders/user-orders/${userEmail}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{margin: "1px",
    background: "rgb(238,174,202)",
    background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
    // Replace with your desired color
    minHeight: "100vh",}}>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <Card style={{ width: "80%", padding: "30dp" }}>
          <Card.Body>
            <Card.Title>Order ID: {order._id}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Book ISBN: {order.isbn}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Buyer: {order.buyerEmail}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Seller: {order.sellerEmail}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Condition Guarantee: {order.conditionVerification}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Order Status: {order.status}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default UserOrders;
