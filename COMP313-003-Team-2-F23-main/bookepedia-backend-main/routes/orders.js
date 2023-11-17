const express = require("express");
const router = express.Router();
const Order = require("../models/order.js");
const Book = require("../models/book.js");

//update orders
router.put("/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const updates = req.body;

  try {
    const order = await Order.findByIdAndUpdate(isbn, updates, { new: true });
    res.json(order);
  } catch (error) {
    const router = express.Router();
    res.status(400).json({ message: error.message });
  }
});

//active orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({ status: { $ne: "Delivered" } }).sort({
      createdAt: "desc",
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get orders by user email
router.get("/user-orders/:buyerEmail", async (req, res) => {
  buyerEmail = req.params.buyerEmail;
  try {
    const orders = await Order.find({ buyerEmail: buyerEmail }).sort({
      createdAt: "desc",
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Creating one order
router.post("/add-order", async (req, res) => {
  const order = new Order({
    bookId: req.body.bookId,
    buyerEmail: req.body.buyerEmail,
    sellerEmail: req.body.sellerEmail,
    orderId: req.body.orderId,
    isbn: req.body.isbn,
    price: req.body.price,
    conditionVerification: req.body.conditionVerification,
  });
  console.log(order);
  try {
    const newOrder = await order.save();
    res.status(201).json({ message: "success" });

    //update book to sold
    const result = await Book.findOneAndUpdate(
      { _id: req.body.bookId },
      { $set: { sold: 1 } }
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//status update
router.put("/statusUpdate/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const status = req.body.status;
  console.log(status);
  try {
    const order = await Order.findByIdAndUpdate(id, { $set: { status } });
    console.log(order);
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete-order/:id", async (req, res) => {
  console.log("delete " + req.params.id);
  try {
    await Order.findByIdAndDelete(req.params.id);
    console.log(res.order)
    res.json({ message: "Deleted Order" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
