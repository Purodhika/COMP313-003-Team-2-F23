const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Book = require("../models/book.js")

//Creating one user
router.post("/register/", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;
  console.log(req.body);
  try {

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(201).json({ message: 'exists' });
    }

    const newUser = new User({
      fname,
      lname,
      email,
      password,
      userType,
    });

    // Save the user to the database
    await newUser.save();
    
    return res.status(201).json({ message: 'success' });
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/listings", async (req, res) => {
  try {
    const users = await Book.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//update a user
router.patch("/:email", getUserByEmail, async (req, res) => {
  if (req.body.fname != null) {
    res.user.fname = req.body.fname;
  }

  if (req.body.lname != null) {
    res.user.lname = req.body.lname;
  }

  if (req.body.userType != null) {
    res.user.userType = req.body.userType;
  }

  if (req.body.password != null) {
    res.user.password = req.body.password;
  }

  if (req.body.userType != null) {
    res.user.userType = req.body.userType;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete user
router.delete("/:email", getUserByEmail, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//finding user by email
router.get("/:email", getUserByEmail, (req, res) => {
  res.json(res.user);
});

//generic function get user by email
async function getUserByEmail(req, res, next) {
  let user;
  try {
    user = await User.findOne({ email: req.params.email });
    if (user == null) {
      return res
        .status(404)
        .json({ message: "Cannot find user " + req.params.email });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  
  res.user = user;
  next();
}

module.exports = router;
