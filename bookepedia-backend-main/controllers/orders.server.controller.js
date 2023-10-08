app.get("/orders/active", async (req, res) => {
    try {
      const activeOrders = await Order.find({ status: "active" });
      res.json(activeOrders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

