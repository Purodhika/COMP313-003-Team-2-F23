import React, { useState, useEffect } from "react";
import axios from "axios";
import Order from "./Order";

const ActiveOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://bookepedia-qta8.onrender.com/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Active Orders</h2>
      {orders.map((order) => (
        <Order key={order._id} order={order} setOrders={setOrders} />
      ))}
    </div>
  );
};

export default ActiveOrders;
