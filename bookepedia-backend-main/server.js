require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

//use JSON translator for data responses
app.use(express.json());
app.use(cors(corsOptions));

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const ordersRouter = require("./routes/orders");
app.use("/user", usersRouter);
app.use("/book", booksRouter);
app.use("/orders", ordersRouter);

app.use("/BookImagesUploaded", express.static("BookImagesUploaded"));

app.listen(3500, () => console.log("Server Started"));
