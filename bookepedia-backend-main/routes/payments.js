const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post("/", async (req, res) => {
  const { name, price, _id } = req.body;

  const lineItems = [{
    price_data: {
      currency: "cad",
      product_data: {
        name: name,
      },
      unit_amount: price * 100,
    },
    quantity:1
  }];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3000/order-summary/${_id}`,
    cancel_url: `http://localhost:3000/home`
  });



  res.json({ id: session.id });
});

module.exports = router;
